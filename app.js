class Sudoku {
    constructor(size = 4) {
        this.sudokuSize = size;
        this.boxLength = Math.sqrt(size);
        this.values = Sudoku.generateBoard(size);
        this.fillBox();
        this.refreshBoard();
    }

    static generateBoard(size = 4, value = null) {
        return Array.from({ length: size }, () => Array(size).fill(value));
    }

    fillBox(row = 0, col = 0) {
        if(row === this.sudokuSize){
            return true;
        }

        let nextCol = (col + 1) % this.sudokuSize;
        let nextRow = (col + 1) >= this.sudokuSize ? row + 1 : row;
        let value = Math.floor(Math.random() * this.sudokuSize);

        for(let i = 0; i < this.sudokuSize; i++){
            this.values[row][col] = (value + i) % this.sudokuSize;
            if(this.deepVerification() && this.fillBox(nextRow, nextCol)){
                return true;
            }
        }

        this.values[row][col] = null;
        return false;
    }

    refreshBoard() {
        for (let cell of cells) {
            cell.style.backgroundColor = color[this.values[cell.id[0]][cell.id[1]]];
        }
    }

    verifySudoku() {
        return this.shortVerification() && this.deepVerification();
    }
    
    shortVerification() {
        return this.nullVerification() && this.duplicatesVerification();
    }

    deepVerification() {
        return this.rowsVerification() && this.columnsVerification() && this.boxVerification();
    }

    nullVerification() {
        for (let row  of this.values) {
            if (row.includes(null)) {
                return false;
            }
        }

        return true;
    }

    duplicatesVerification() {
        let totalValues = Array(this.sudokuSize).fill(0);

        for (let row of this.values) {
            for (let value of row) {
                totalValues[value]++;
            }
        }

        for (let value of totalValues) {
            if (value !== 4) {
                return false;
            }
        }

        return true;
    }

    rowsVerification() {
        for (let row of this.values) {
            let totalValues = Array(this.sudokuSize).fill(0);

            for (let value of row) {
                totalValues[value]++;
            }

            for (let value of totalValues) {
                if (value > 1) {
                    return false;
                }
            }
        }

        return true;
    }

    columnsVerification() {
        let totalValues = Array.from({ length: this.sudokuSize }, () => Array(this.sudokuSize).fill(0));

        for (let row of this.values) {
            let columnIndex = 0;

            for (let value of row) {
                totalValues[columnIndex][value]++;
                columnIndex++;
            }
        }

        for (let column of totalValues) {
            for (let value of column) {
                if (value > 1) {
                    return false;
                }
            }
        }

        return true;
    }

    boxVerification() {
        let totalValues = Array.from({ length: this.sudokuSize }, () => Array(this.sudokuSize).fill(0));
        let index = 0;

        for (let row of this.values) {
            for (let value of row) {
                const boxIndex = Math.floor((index / this.boxLength)) % this.boxLength;
                const boxOffset = Math.floor(index / (this.sudokuSize * this.boxLength)) * this.boxLength;
                totalValues[boxIndex + boxOffset][value]++;
                index++;
            }
        }

        for (let column of totalValues) {
            for (let value of column) {
                if (value > 1) {
                    return false;
                }
            }
        }

        return true;
    }
    
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('click', function (e) {
    if(e.target.classList.contains("box") && !e.target.classList.contains("start")){
        let box = e.target;
        game.values[box.id[0]][box.id[1]] = (game.values[box.id[0]][box.id[1]] + 1) % 4;
        box.style.backgroundColor = color[game.values[box.id[0]][box.id[1]]];
        console.log(game.columnsVerification(true));
    }
});

document.addEventListener('contextmenu', function (e) {
    if(e.target.classList.contains("box") && !e.target.classList.contains("start")){
        let box = e.target;
        game.values[box.id[0]][box.id[1]] = null;
        box.style.backgroundColor = "";
    }
});

const color = ["#d63031", "#fdcb6e", "#00b894", "#0984e3"];
let cells = document.getElementsByClassName('box');
const game = new Sudoku();