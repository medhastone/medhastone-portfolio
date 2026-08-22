export interface PlayerStats {
  level: number;
  coins: number;
  gems: number;
  xp: number;
  highestScore: number;
  soundEnabled: boolean;
}

const defaultStats: PlayerStats = {
  level: 1,
  coins: 0,
  gems: 0,
  xp: 0,
  highestScore: 0,
  soundEnabled: true,
};

export function loadStats(): PlayerStats {
  try {
    const saved = localStorage.getItem('bubble_pop_stats');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load stats', e);
  }
  return { ...defaultStats };
}

export function saveStats(stats: PlayerStats) {
  try {
    localStorage.setItem('bubble_pop_stats', JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
}
