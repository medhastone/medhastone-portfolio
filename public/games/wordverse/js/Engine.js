export class GameEngine {
    constructor(dictionary) {
        this.dictionary = dictionary;
        this.boardSize = 4;
        this.grid = [];
        this.score = 0;
        this.foundWords = new Set();
        this.combo = 0;
        this.comboTimer = null;
        this.allPossibleWords = [];
        this.targetWords = [];
    }
    
    countWords(grid) {
        const size = this.boardSize;
        const visited = Array(size).fill(null).map(() => Array(size).fill(false));
        const found = new Set();
        
        const dfs = (r, c, currentWord) => {
            if (currentWord.length >= 3 && this.dictionary.isValidWord(currentWord) && !found.has(currentWord)) {
                found.add(currentWord);
            }
            if (currentWord.length >= 8) return;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visited[nr][nc]) {
                        const nextWord = currentWord + grid[nr][nc];
                        if (this.dictionary.isPrefix(nextWord)) {
                            visited[nr][nc] = true;
                            dfs(nr, nc, nextWord);
                            visited[nr][nc] = false;
                        }
                    }
                }
            }
        };
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                visited[r][c] = true;
                dfs(r, c, grid[r][c]);
                visited[r][c] = false;
            }
        }
        return found;
    }

    generateBoard(difficulty = 'easy') {
        let size = 4;
        let pool = "";
        let minWords = 20;

        if (difficulty === 'easy') {
            size = 4;
            pool = "AAAAAEEEEEIIIIIOOOOOUUUBBCCDDFFGGHHLLMMNNNPPQRRRSSSTTTTYY";
            minWords = 30;
        } else if (difficulty === 'medium') {
            size = 4;
            pool = "AAAAABBCCDDDEEEEEEEEEEFFFGGGHHIIIIIIJKLLLLMMNNNNNOOOOOOOPPQRRRRRSSSSSSTTTTTTTUUUUVVWWXYYZZ";
            minWords = 20;
        } else if (difficulty === 'hard') {
            size = 5;
            pool = "AAAAABBCCDDDEEEEEEEEEEFFFGGGHHIIIIIIJKLLLLMMNNNNNOOOOOOOPPQRRRRRSSSSSSTTTTTTTUUUUVVWWXYYZZ";
            minWords = 40;
        } else if (difficulty === 'master') {
            size = 5;
            pool = "ABCDEFGHIKLMNOPRSTUVWYABCDEFGHIKLMNOPRSTUVWYAEIOU";
            minWords = 20;
        }

        this.boardSize = size;
        this.grid = Array(size).fill(null).map(() => Array(size).fill(''));
        
        let attempts = 0;
        let bestGrid = null;
        let maxWords = 0;
        let bestWordsSet = new Set();

        while(attempts < 20) {
            const tempGrid = Array(size).fill(null).map(() => Array(size).fill(''));
            for(let r = 0; r < size; r++) {
                for(let c = 0; c < size; c++) {
                    tempGrid[r][c] = pool.charAt(Math.floor(Math.random() * pool.length));
                }
            }
            let wordsSet = this.countWords(tempGrid);
            if (wordsSet.size > maxWords) {
                maxWords = wordsSet.size;
                bestGrid = tempGrid.map(row => [...row]);
                bestWordsSet = wordsSet;
            }
            if (maxWords >= minWords) break;
            attempts++;
        }
        
        this.grid = bestGrid;
        this.foundWords.clear();
        this.combo = 0;
        
        this.allPossibleWords = Array.from(bestWordsSet);
        let poolForTargets = [...this.allPossibleWords];
        let targetCount = 6;
        
        if (difficulty === 'easy') {
            poolForTargets = this.allPossibleWords.filter(w => w.length >= 3 && w.length <= 4);
            targetCount = 6;
        } else if (difficulty === 'medium') {
            poolForTargets = this.allPossibleWords.filter(w => w.length >= 4 && w.length <= 5);
            targetCount = 8;
        } else {
            poolForTargets = this.allPossibleWords.filter(w => w.length >= 5);
            targetCount = 10;
        }
        
        if (poolForTargets.length < targetCount) {
            poolForTargets = [...this.allPossibleWords];
        }
        
        poolForTargets.sort(() => Math.random() - 0.5);
        this.targetWords = poolForTargets.slice(0, targetCount);
    }

    getWordFromIndices(indices) {
        return indices.map(idx => this.grid[idx.row][idx.col]).join('');
    }

    submitWord(indices) {
        if(indices.length < 3) return { valid: false, reason: 'too_short' };
        
        const word = this.getWordFromIndices(indices);
        
        if (this.foundWords.has(word)) {
            return { valid: false, reason: 'duplicate', word };
        }
        if (this.dictionary.isValidWord(word)) {
            this.foundWords.add(word);
            this.combo++;
            
            // Score calculation
            let baseScore = 0;
            if(word.length === 3) baseScore = 10;
            else if(word.length === 4) baseScore = 20;
            else if(word.length === 5) baseScore = 35;
            else if(word.length === 6) baseScore = 50;
            else baseScore = 50 + (word.length - 6) * 20;
            
            // Bonus if it's a target word
            if (this.targetWords.includes(word)) {
                baseScore += 20;
            }

            const points = baseScore * Math.min(this.combo, 5);
            this.score += points;
            this.resetComboTimer();
            return { valid: true, word, points, combo: this.combo };
        }
        this.combo = 0;
        return { valid: false, reason: 'invalid', word };
    }

    resetComboTimer() {
        if(this.comboTimer) clearTimeout(this.comboTimer);
        this.comboTimer = setTimeout(() => {
            this.combo = 0;
            if(this.onComboBreak) this.onComboBreak();
        }, 3000);
    }

    findWordPath(targetWord) {
        const size = this.boardSize;
        const visited = Array(size).fill(null).map(() => Array(size).fill(false));
        const dfs = (r, c, path) => {
            const currentWord = path.map(p => this.grid[p.row][p.col]).join('');
            if (currentWord === targetWord) return path;
            if (!targetWord.startsWith(currentWord)) return null;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        const res = dfs(nr, nc, [...path, {row: nr, col: nc}]);
                        if (res) return res;
                        visited[nr][nc] = false;
                    }
                }
            }
            return null;
        };

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (this.grid[r][c] === targetWord[0]) {
                    visited[r][c] = true;
                    const res = dfs(r, c, [{row: r, col: c}]);
                    if (res) return res;
                    visited[r][c] = false;
                }
            }
        }
        return null;
    }

    getHint() {
        const unfoundTargets = this.targetWords.filter(w => !this.foundWords.has(w));
        if (unfoundTargets.length > 0) {
            return this.findWordPath(unfoundTargets[0]);
        }
        const anyUnfound = this.allPossibleWords.filter(w => !this.foundWords.has(w));
        if (anyUnfound.length > 0) {
            return this.findWordPath(anyUnfound[0]);
        }
        return null;
    }
}
