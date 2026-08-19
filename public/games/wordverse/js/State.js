export class StateManager {
    constructor() {
        this.data = this.load();
    }

    load() {
        try {
            const saved = localStorage.getItem('wordverse_save');
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.warn('LocalStorage blocked');
        }
        return this.getDefaultData();
    }

    getDefaultData() {
        return {
            xp: 0,
            level: 1,
            coins: 0,
            gamesPlayed: 0,
            wordsFound: 0,
            bestScore: 0,
            bestWord: '',
            streak: 0,
            lastPlayedDate: null,
            collection: []
        };
    }

    save() {
        try {
            localStorage.setItem('wordverse_save', JSON.stringify(this.data));
        } catch (e) { }
    }

    getRank() {
        if (this.data.xp < 1000) return 'WORD ROOKIE';
        if (this.data.xp < 2500) return 'LETTER SCOUT';
        if (this.data.xp < 5000) return 'WORD HUNTER';
        if (this.data.xp < 10000) return 'WORD MASTER';
        if (this.data.xp < 25000) return 'LEXICON';
        if (this.data.xp < 50000) return 'WORD WIZARD';
        return 'WORD LEGEND';
    }

    updatePostGame(score, foundWordsList) {
        this.data.gamesPlayed++;
        this.data.wordsFound += foundWordsList.length;
        
        if (score > this.data.bestScore) {
            this.data.bestScore = score;
        }

        foundWordsList.forEach(w => {
            if (w.length > this.data.bestWord.length) {
                this.data.bestWord = w;
            }
            if (!this.data.collection.includes(w)) {
                this.data.collection.push(w);
            }
        });

        // Simple XP formula: 1 XP per 10 points
        const xpGained = Math.floor(score / 10);
        this.data.xp += xpGained;
        
        // Level up check
        this.data.level = Math.floor(this.data.xp / 1000) + 1;

        // Daily streak logic
        const today = new Date().toDateString();
        if (this.data.lastPlayedDate !== today) {
            if (this.data.lastPlayedDate) {
                const lastDate = new Date(this.data.lastPlayedDate);
                const diffTime = Math.abs(new Date() - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (diffDays === 1) {
                    this.data.streak++;
                } else {
                    this.data.streak = 1;
                }
            } else {
                this.data.streak = 1;
            }
            this.data.lastPlayedDate = today;
        }

        this.save();
        return { xpGained, newRank: this.getRank() };
    }
}
