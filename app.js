class Sudoku {
    constructor(size = 4) {
        this.values = this.generateBoard(size);
        this.boxLength = Math.sqrt(this.values.length);
        this.refreshBoard();
    }

    generateBoard(size) {
        return Array.from({ length: size }, () => Array(size).fill(null));
        // return [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];
    }

    refreshBoard() {
        for (let cell of cells) {
            cell.style.backgroundColor = color[this.values[cell.id[0]][cell.id[1]]];
        }
    }

    verifySudoku() {
        return this.shortVerification() && this.deepVerification()
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
        let totalValues = [0,0,0,0];

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
            let totalValues = [0, 0, 0, 0]

            for (let value of row) {
                totalValues[value]++;
            }

            for (let value of totalValues) {
                if (value !== 1) {
                    return false;
                }
            }
        }

        return true;
    }

    columnsVerification() {
        let totalValues = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

        for (let row of this.values) {
            let columnIndex = 0;

            for (let value of row) {
                totalValues[columnIndex][value]++;
                columnIndex++;
            }
        }

        for (let column of totalValues) {
            for (let value of column) {
                if (value !== 1) {
                    return false;
                }
            }
        }

        return true;
    }

    boxVerification() {
        let totalValues = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        let index = 0;

        for (let row of this.values) {
            for (let value of row) {
                const boxIndex = Math.floor((index / this.boxLength)) % this.boxLength;
                const boxOffset = Math.floor(index / (this.values.length * this.boxLength)) * this.boxLength;
                totalValues[boxIndex + boxOffset][value]++;
                index++;
            }
        }

        for (let column of totalValues) {
            for (let value of column) {
                if (value !== 1) {
                    return false;
                }
            }
        }

        return true;
    }
    
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('click', function (e) {
    if(e.target.classList.contains("box")){
        let box = e.target;
        game.values[box.id[0]][box.id[1]] = (game.values[box.id[0]][box.id[1]] + 1) % 4;
        box.style.backgroundColor = color[game.values[box.id[0]][box.id[1]]];
        console.log(game.verifySudoku());
    }
})

document.addEventListener('contextmenu', function (e) {
    if(e.target.classList.contains("box")){
        let box = e.target;
        game.values[box.id[0]][box.id[1]] = null;
        box.style.backgroundColor = "";
    }
})

const color = ["#d63031", "#fdcb6e", "#00b894", "#0984e3"];
let cells = document.getElementsByClassName('box');
const game = new Sudoku();