const Utils = {
    random: (min, max) => Math.random() * (max - min) + min,
    distance: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
    clamp: (val, min, max) => Math.max(min, Math.min(max, val)),
    loadData: (key, defaultVal) => {
        const data = localStorage.getItem('pong_reimagined_' + key);
        return data ? JSON.parse(data) : defaultVal;
    },
    saveData: (key, val) => {
        localStorage.setItem('pong_reimagined_' + key, JSON.stringify(val));
    }
};
