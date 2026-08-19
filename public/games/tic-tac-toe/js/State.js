export class StateManager {
    constructor() {
        this.data = this.load();
    }

    load() {
        try {
            const saved = localStorage.getItem('ttt_pro_data');
            if (saved) return JSON.parse(saved);
        } catch (e) { console.warn('Storage error'); }
        
        return {
            rating: 1000,
            xp: 0,
            games: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            bestStreak: 0,
            currentStreak: 0
        };
    }

    save() {
        try {
            localStorage.setItem('ttt_pro_data', JSON.stringify(this.data));
        } catch (e) {}
    }

    getRank() {
        const r = this.data.rating;
        if (r < 1100) return 'NOVICE';
        if (r < 1300) return 'ROOKIE';
        if (r < 1600) return 'TACTICIAN';
        if (r < 2000) return 'ELITE';
        if (r < 2500) return 'MASTER';
        return 'VOID CHAMPION';
    }

    updateMatchResult(isWin, isDraw, ratingChange) {
        this.data.games++;
        this.data.rating += ratingChange;
        if (this.data.rating < 500) this.data.rating = 500; // Floor

        if (isWin) {
            this.data.wins++;
            this.data.currentStreak++;
            if (this.data.currentStreak > this.data.bestStreak) {
                this.data.bestStreak = this.data.currentStreak;
            }
            this.data.xp += 50 + (this.data.currentStreak * 10);
        } else if (isDraw) {
            this.data.draws++;
            this.data.currentStreak = 0;
            this.data.xp += 10;
        } else {
            this.data.losses++;
            this.data.currentStreak = 0;
            this.data.xp += 5;
        }
        
        this.save();
        return {
            xpEarned: isWin ? 50 + (this.data.currentStreak * 10) : (isDraw ? 10 : 5),
            newRating: this.data.rating,
            rank: this.getRank()
        };
    }
}
