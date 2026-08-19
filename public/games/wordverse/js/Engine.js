export class GameEngine {
    constructor(dictionary) {
        this.dictionary = dictionary;
        this.boardSize = 4;
        this.grid = [];
        this.score = 0;
        this.foundWords = new Set();
        this.combo = 0;
        this.comboTimer = null;
    }

    generateBoard(size = 4, targetWords = []) {
        this.boardSize = size;
        this.grid = Array(size).fill(null).map(() => Array(size).fill(''));
        
        // English letter frequencies for filling gaps
        const pool = "AAAAABBCCDDDEEEEEEEEEEFFFGGGHHIIIIIIJKLLLLMMNNNNNOOOOOOOPPQRRRRRSSSSSSTTTTTTTUUUUVVWWXYYZZ";
        
        // Simple fill for now (can be upgraded to place target words deterministically)
        for(let r = 0; r < size; r++) {
            for(let c = 0; c < size; c++) {
                this.grid[r][c] = pool.charAt(Math.floor(Math.random() * pool.length));
            }
        }
        
        this.score = 0;
        this.foundWords.clear();
        this.combo = 0;
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

            const points = baseScore * Math.min(this.combo, 5);
            this.score += points;

            this.resetComboTimer();

            return { valid: true, word, points, combo: this.combo };
        }

        // Invalid word breaks combo
        this.combo = 0;
        return { valid: false, reason: 'invalid', word };
    }

    resetComboTimer() {
        if(this.comboTimer) clearTimeout(this.comboTimer);
        this.comboTimer = setTimeout(() => {
            this.combo = 0;
            if(this.onComboBreak) this.onComboBreak();
        }, 3000); // 3 seconds to chain next word
    }

    getHint() {
        const size = this.boardSize;
        const visited = Array(size).fill(null).map(() => Array(size).fill(false));
        
        const dfs = (r, c, currentWord, path) => {
            if (currentWord.length >= 3 && this.dictionary.isValidWord(currentWord) && !this.foundWords.has(currentWord)) {
                return path;
            }
            if (currentWord.length >= 8) return null;

            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visited[nr][nc]) {
                        const nextWord = currentWord + this.grid[nr][nc];
                        if (this.dictionary.isPrefix(nextWord)) {
                            visited[nr][nc] = true;
                            path.push({row: nr, col: nc});
                            const result = dfs(nr, nc, nextWord, path);
                            if (result) return result;
                            path.pop();
                            visited[nr][nc] = false;
                        }
                    }
                }
            }
            return null;
        };

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                visited[r][c] = true;
                const result = dfs(r, c, this.grid[r][c], [{row: r, col: c}]);
                if (result) return result;
                visited[r][c] = false;
            }
        }
        return null;
    }
}