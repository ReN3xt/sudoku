class Sudoku {
    constructor(size = 4) {
        this.sudokuSize = size;
        this.boxSize = Math.sqrt(size);
        this.values = Sudoku.generateEmptyBoard(size);
        this.generateSolution();
        this.generateInitialBoard();
    }

    static generateEmptyBoard(size = 4) {
        return Array.from({ length: size }, () => Array(size).fill(null));
    }

    generateSolution(row = 0, col = 0) {
        if (row === this.sudokuSize) return true;

        const nextCol = (col + 1) % this.sudokuSize;
        const nextRow = (col + 1) >= this.sudokuSize ? row + 1 : row;

        const startValue = Math.floor(Math.random() * this.sudokuSize);

        for(let offset = 0; offset < this.sudokuSize; offset++){
            this.values[row][col] = (startValue + offset) % this.sudokuSize;

            if (this.fullValidation() && this.generateSolution(nextRow, nextCol)) return true;
        }

        this.values[row][col] = null;
        return false;
    }

    generateInitialBoard() {
        for (let i = 0; i < 12; i++) {
            const row = Math.floor(Math.random() * this.sudokuSize);
            const col = Math.floor(Math.random() * this.sudokuSize);
            
            if (this.values[row][col] === null) i--;
            else this.values[row][col] = null;
        }
    }

    isValid() {
        return this.basicValidation() && this.fullValidation();
    }
    
    basicValidation() {
        return this.checkForNulls() && this.validateValueCounts();
    }

    fullValidation() {
        return this.validateRows() && this.validateColumns() && this.validateBoxes();
    }

    checkForNulls() {
        for (let row  of this.values) {
            if (row.includes(null)) return false;
        }

        return true;
    }

    validateValueCounts() {
        let totalValues = Array(this.sudokuSize).fill(0);

        for (let row of this.values) {
            for (let value of row) {
                totalValues[value]++;
            }
        }

        for (let value of totalValues) {
            if (value !== 4) return false;
        }

        return true;
    }

    validateRows() {
        for (let row of this.values) {
            let totalValues = Array(this.sudokuSize).fill(0);

            for (let value of row) {
                if (++totalValues[value] > 1) return false;
            }
        }

        return true;
    }

    validateColumns() {
        let totalValues = Array.from({ length: this.sudokuSize }, () => Array(this.sudokuSize).fill(0));

        for (let row of this.values) {
            let columnIndex = 0;

            for (let value of row) {
                if (++totalValues[columnIndex][value] > 1) return false;

                columnIndex++;
            }
        }

        return true;
    }

    validateBoxes() {
        let totalValues = Array.from({ length: this.sudokuSize }, () => Array(this.sudokuSize).fill(0));
        let index = 0;

        for (let row of this.values) {
            for (let value of row) {
                const boxIndex = Math.floor((index / this.boxSize)) % this.boxSize;
                const boxOffset = Math.floor(index / (this.sudokuSize * this.boxSize)) * this.boxSize;

                if (++totalValues[boxIndex + boxOffset][value] > 1) return false;

                index++;
            }
        }

        return true;
    }
    
}