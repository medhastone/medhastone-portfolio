import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { playPokemonCry, stopCurrentCry, subscribePokemonCryState } from '../../utils/pokemonAudio';

interface PokemonCryButtonProps {
  pokemonId: number;
  pokemonName: string;
  variant?: 'icon' | 'pill' | 'compact';
  className?: string;
}

export default function PokemonCryButton({
  pokemonId,
  pokemonName,
  variant = 'pill',
  className = '',
}: PokemonCryButtonProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribePokemonCryState((playingId, loadingId) => {
      setIsPlaying(playingId === pokemonId);
      setIsLoading(loadingId === pokemonId);
    });
    return unsubscribe;
  }, [pokemonId]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isPlaying) {
      stopCurrentCry();
    } else {
      playPokemonCry(pokemonId, pokemonName);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        title={
          isPlaying 
            ? `Stop ${pokemonName}'s cry` 
            : `Play ${pokemonName}'s official cry (Browser Audio API)`
        }
        aria-label={`Play ${pokemonName} cry`}
        className={`relative p-1.5 rounded-lg transition-all duration-200 group/cry ${
          isPlaying
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/50 scale-105'
            : isLoading
            ? 'bg-white/10 text-rose-300'
            : 'bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/5 hover:border-rose-500/30'
        } ${className}`}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
        ) : isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>
        ) : (
          <Volume2 className="w-3.5 h-3.5 transition-transform group-hover/cry:scale-110" />
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        title={`Play ${pokemonName}'s official cry`}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
          isPlaying
            ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
            : isLoading
            ? 'bg-white/10 text-rose-300'
            : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/30'
        } ${className}`}
      >
        {isLoading ? (
          <Loader2 className="w-3 h-3 animate-spin text-rose-400" />
        ) : isPlaying ? (
          <>
            <VolumeX className="w-3 h-3" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3 h-3 text-rose-400" />
            <span>Cry</span>
          </>
        )}
      </button>
    );
  }

  // Default: 'pill' variant - visually rich, with animated soundwave bars
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      title={
        isPlaying
          ? `Stop ${pokemonName}'s cry`
          : `Play ${pokemonName}'s official cry via Browser Audio API`
      }
      aria-label={`Play official cry for ${pokemonName}`}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 select-none ${
        isPlaying
          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400/40 scale-[1.02]'
          : isLoading
          ? 'bg-white/10 text-rose-300 border border-white/10 cursor-wait'
          : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 hover:shadow-md hover:shadow-rose-500/10'
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
          <span className="text-[11px] font-semibold text-rose-300">Loading Cry...</span>
        </>
      ) : isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3.5">
            <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-3.5"></span>
            <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-2"></span>
            <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-3"></span>
            <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_150ms] h-1.5"></span>
          </div>
          <span className="text-[11px] font-bold">Playing Cry</span>
          <VolumeX className="w-3.5 h-3.5 opacity-80 hover:opacity-100" />
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-rose-400 transition-transform group-hover:scale-110" />
          <span className="text-[11px] tracking-wide">Play Cry</span>
        </>
      )}
    </button>
  );
}
