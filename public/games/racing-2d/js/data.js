const CAR_DATA = [
    // Starter
    { id: 'compact', name: 'Compact Car', cost: 0, color: '#3b82f6', maxSpeed: 10, acc: 0.1, handle: 0.1, nitro: 100 },
    { id: 'hatchback', name: 'Hatchback', cost: 500, color: '#22c55e', maxSpeed: 12, acc: 0.12, handle: 0.12, nitro: 120 },
    { id: 'sedan', name: 'Sedan', cost: 1000, color: '#94a3b8', maxSpeed: 14, acc: 0.15, handle: 0.15, nitro: 150 },
    { id: 'wagon', name: 'Station Wagon', cost: 1500, color: '#8b5cf6', maxSpeed: 15, acc: 0.13, handle: 0.14, nitro: 160 },
    { id: 'suv', name: 'City SUV', cost: 2000, color: '#64748b', maxSpeed: 15, acc: 0.16, handle: 0.12, nitro: 180 },
    
    // Sports
    { id: 'turbo', name: 'Turbo Racer', cost: 2500, color: '#f97316', maxSpeed: 16, acc: 0.2, handle: 0.18, nitro: 200 },
    { id: 'street', name: 'Street Beast', cost: 5000, color: '#ef4444', maxSpeed: 18, acc: 0.22, handle: 0.2, nitro: 250 },
    { id: 'nitro', name: 'Nitro GT', cost: 8000, color: '#c084fc', maxSpeed: 20, acc: 0.25, handle: 0.22, nitro: 300 },
    { id: 'drift', name: 'Drift King', cost: 10000, color: '#ec4899', maxSpeed: 21, acc: 0.24, handle: 0.26, nitro: 320 },
    { id: 'rally', name: 'Rally Pro', cost: 12000, color: '#0ea5e9', maxSpeed: 22, acc: 0.28, handle: 0.24, nitro: 350 },
    
    // Supercars
    { id: 'hyper', name: 'Hyper X', cost: 15000, color: '#eab308', maxSpeed: 24, acc: 0.3, handle: 0.25, nitro: 400 },
    { id: 'phantom', name: 'Phantom GT', cost: 25000, color: '#000000', maxSpeed: 26, acc: 0.35, handle: 0.28, nitro: 500 },
    { id: 'velocity', name: 'Velocity R', cost: 35000, color: '#22d3ee', maxSpeed: 28, acc: 0.38, handle: 0.29, nitro: 550 },
    { id: 'apex', name: 'Apex Predator', cost: 45000, color: '#b91c1c', maxSpeed: 29, acc: 0.39, handle: 0.3, nitro: 580 },
    { id: 'vortex', name: 'Vortex V12', cost: 50000, color: '#4f46e5', maxSpeed: 30, acc: 0.4, handle: 0.3, nitro: 600 },
    
    // Special
    { id: 'police', name: 'Police Interceptor', cost: 60000, color: '#1d4ed8', maxSpeed: 31, acc: 0.42, handle: 0.32, nitro: 650 },
    { id: 'monster', name: 'Monster Truck', cost: 70000, color: '#166534', maxSpeed: 25, acc: 0.5, handle: 0.2, nitro: 700 },
    { id: 'electric', name: 'Electric Racer', cost: 80000, color: '#06b6d4', maxSpeed: 33, acc: 0.55, handle: 0.34, nitro: 400 },
    { id: 'formula', name: 'Formula Car', cost: 100000, color: '#dc2626', maxSpeed: 35, acc: 0.5, handle: 0.4, nitro: 750 },
    { id: 'cyber', name: 'Cyber Car', cost: 150000, color: '#9d174d', maxSpeed: 36, acc: 0.52, handle: 0.38, nitro: 800 },
    
    // Legendary
    { id: 'golden', name: 'Golden Racer', cost: 250000, color: '#fbbf24', maxSpeed: 38, acc: 0.6, handle: 0.42, nitro: 900 },
    { id: 'neon', name: 'Neon Hypercar', cost: 500000, color: '#34d399', maxSpeed: 40, acc: 0.65, handle: 0.45, nitro: 1000 },
    { id: 'future', name: 'Future Prototype', cost: 1000000, color: '#f8fafc', maxSpeed: 45, acc: 0.7, handle: 0.5, nitro: 1200 },
    { id: 'alien', name: 'Alien Tech', cost: 2500000, color: '#84cc16', maxSpeed: 50, acc: 0.8, handle: 0.6, nitro: 1500 },
    { id: 'light', name: 'Speed of Light', cost: 5000000, color: '#ffffff', maxSpeed: 60, acc: 0.9, handle: 0.8, nitro: 2000 }
];

const ENVIRONMENTS = [
    { id: 'city', name: 'City Highway', bg: '#2b2b2b', road: '#404040', lines: '#ffffff', grass: '#1a472a' },
    { id: 'desert', name: 'Desert Road', bg: '#d2b48c', road: '#8c7355', lines: '#ffd700', grass: '#e3c16f' },
    { id: 'snow', name: 'Snow Mountains', bg: '#e0f2fe', road: '#94a3b8', lines: '#ffffff', grass: '#f8fafc' },
    { id: 'night', name: 'Night City', bg: '#0f172a', road: '#1e293b', lines: '#fbbf24', grass: '#020617' },
    { id: 'forest', name: 'Forest Route', bg: '#166534', road: '#451a03', lines: '#fb923c', grass: '#14532d' },
    { id: 'coast', name: 'Coastal Road', bg: '#38bdf8', road: '#78716c', lines: '#ffffff', grass: '#fcd34d' }
];

const UPGRADE_COSTS = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
