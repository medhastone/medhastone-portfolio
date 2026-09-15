/**
 * Pokémon Cry Player using the Browser Audio API (Web Audio API & AudioContext).
 * 
 * Fetches official Pokémon cries from PokéAPI's official audio repository,
 * decodes the binary audio data using AudioContext.decodeAudioData,
 * and plays it through the browser's audio graph with caching and gain control.
 */

// Global AudioContext singleton (lazily instantiated on first user gesture)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// In-memory cache for decoded AudioBuffers to prevent redundant network requests
const audioBufferCache = new Map<number, AudioBuffer>();

// Current playback tracking
let currentSourceNode: AudioBufferSourceNode | null = null;
let currentPlayingId: number | null = null;
let currentLoadingId: number | null = null;
let currentHtmlAudio: HTMLAudioElement | null = null;

// Listeners for UI state synchronizations
type CryListener = (playingId: number | null, loadingId: number | null) => void;
const listeners = new Set<CryListener>();

function notifyListeners() {
  listeners.forEach(fn => fn(currentPlayingId, currentLoadingId));
}

export function subscribePokemonCryState(listener: CryListener): () => void {
  listeners.add(listener);
  // Initial emit
  listener(currentPlayingId, currentLoadingId);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Returns the primary official cry URL from PokeAPI's cry archive.
 */
export function getOfficialCryUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
}

/**
 * Legacy Gen 1-5 official cry fallback URL.
 */
export function getLegacyCryUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`;
}

/**
 * Pokémon Showdown MP3 cry fallback URL.
 */
export function getShowdownCryUrl(name: string): string {
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://play.pokemonshowdown.com/audio/cries/${clean}.mp3`;
}

/**
 * Stop any currently playing cry.
 */
export function stopCurrentCry() {
  if (currentSourceNode) {
    try {
      currentSourceNode.stop();
      currentSourceNode.disconnect();
    } catch {
      // Ignore if already stopped
    }
    currentSourceNode = null;
  }

  if (currentHtmlAudio) {
    try {
      currentHtmlAudio.pause();
      currentHtmlAudio.currentTime = 0;
    } catch {
      // Ignore
    }
    currentHtmlAudio = null;
  }

  currentPlayingId = null;
  currentLoadingId = null;
  notifyListeners();
}

/**
 * Fetches and plays the official Pokémon cry using the Browser Audio API.
 * 
 * Flow:
 * 1. If currently playing this Pokémon, toggle stop.
 * 2. Stop any other active cry.
 * 3. Look up in AudioBuffer cache.
 * 4. If not cached, fetch official PokeAPI cry OGG via fetch() -> arrayBuffer().
 * 5. Decode with audioContext.decodeAudioData().
 * 6. Play through gain node.
 * 7. If fetch/decode fails, fallback to HTML5 Audio with Showdown MP3.
 */
export async function playPokemonCry(id: number, name?: string): Promise<boolean> {
  // If already playing this cry, stopping acts as a toggle
  if (currentPlayingId === id) {
    stopCurrentCry();
    return false;
  }

  // Stop any other currently playing cry
  stopCurrentCry();

  currentLoadingId = id;
  notifyListeners();

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    let buffer = audioBufferCache.get(id);

    if (!buffer) {
      // Attempt 1: Fetch latest official cry from PokéAPI
      let arrayBuf: ArrayBuffer | null = null;
      try {
        const primaryUrl = getOfficialCryUrl(id);
        const res = await fetch(primaryUrl);
        if (res.ok) {
          arrayBuf = await res.arrayBuffer();
        }
      } catch (err) {
        console.warn(`Primary cry fetch failed for Pokémon #${id}:`, err);
      }

      // Attempt 2: If primary failed and ID <= 649, try legacy cry
      if (!arrayBuf && id <= 649) {
        try {
          const legacyUrl = getLegacyCryUrl(id);
          const res = await fetch(legacyUrl);
          if (res.ok) {
            arrayBuf = await res.arrayBuffer();
          }
        } catch (err) {
          console.warn(`Legacy cry fetch failed for Pokémon #${id}:`, err);
        }
      }

      // Attempt 3: If still not loaded and name is provided, fetch Showdown MP3
      if (!arrayBuf && name) {
        try {
          const showdownUrl = getShowdownCryUrl(name);
          const res = await fetch(showdownUrl);
          if (res.ok) {
            arrayBuf = await res.arrayBuffer();
          }
        } catch (err) {
          console.warn(`Showdown cry fetch failed for Pokémon ${name}:`, err);
        }
      }

      if (!arrayBuf) {
        throw new Error(`Could not fetch audio data for Pokémon #${id}`);
      }

      // Decode audio data using browser's AudioContext
      buffer = await ctx.decodeAudioData(arrayBuf.slice(0));
      audioBufferCache.set(id, buffer);
    }

    // Finished loading, starting playback
    currentLoadingId = null;
    currentPlayingId = id;
    notifyListeners();

    // Create source node & gain node for comfortable listening level
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.85, ctx.currentTime);

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    currentSourceNode = source;

    source.onended = () => {
      if (currentPlayingId === id) {
        currentPlayingId = null;
        currentSourceNode = null;
        notifyListeners();
      }
    };

    source.start(0);
    return true;

  } catch (error) {
    console.warn(`Web Audio API cry playback error for #${id}, attempting HTML5 Audio fallback:`, error);
    
    // Graceful fallback using HTML5 Audio Element API
    try {
      const fallbackUrl = name ? getShowdownCryUrl(name) : getOfficialCryUrl(id);
      const audio = new Audio(fallbackUrl);
      currentHtmlAudio = audio;
      
      currentLoadingId = null;
      currentPlayingId = id;
      notifyListeners();

      audio.onended = () => {
        if (currentPlayingId === id) {
          currentPlayingId = null;
          currentHtmlAudio = null;
          notifyListeners();
        }
      };

      audio.onerror = () => {
        currentPlayingId = null;
        currentLoadingId = null;
        currentHtmlAudio = null;
        notifyListeners();
      };

      await audio.play();
      return true;
    } catch (fallbackError) {
      console.error(`All cry playback methods failed for #${id}:`, fallbackError);
      currentPlayingId = null;
      currentLoadingId = null;
      notifyListeners();
      return false;
    }
  }
}
