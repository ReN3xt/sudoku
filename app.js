document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('click', function (e) {
    console.log(e.target.id);
    if(e.target.classList.contains("cell") && !e.target.classList.contains("init") && isGameStarted){
        let cell = e.target;

        cell.classList.remove(color[sudoku.values[cell.id[0]][cell.id[1]]]);
        sudoku.values[cell.id[0]][cell.id[1]] = (sudoku.values[cell.id[0]][cell.id[1]] + 1) % 4;
        cell.classList.add(color[sudoku.values[cell.id[0]][cell.id[1]]]);

        if(sudoku.isValid()) gameOver();
    } else if (e.target.id === "new-game" && !isGameStarted) startGame();
});

document.addEventListener('contextmenu', function (e) {
    if(e.target.classList.contains("cell") && !e.target.classList.contains("init") && isGameStarted){
        let cell = e.target;

        cell.classList.remove(color[sudoku.values[cell.id[0]][cell.id[1]]]);
        sudoku.values[cell.id[0]][cell.id[1]] = null;
    }
});

function updateUI() {
    for (let cell of cells) {
        if (sudoku.values[cell.id[0]][cell.id[1]] !== null) {
            cell.classList.add("init");
            cell.classList.add(color[sudoku.values[cell.id[0]][cell.id[1]]]);
        }
    }
}

function resetUI() {
    for (let cell of cells) {
        cell.className = "cell";
    }
}

function startGame() {
    resetUI()
    sudoku = new Sudoku();
    isGameStarted = true;
    newGame.classList.add('hidden');
    grid.classList.remove('inactive');
    ui.classList.remove('win');
    updateUI();
}

function gameOver() {
    isGameStarted = false;
    ui.classList.add('win');
    grid.classList.add('inactive');
    newGame.classList.remove('hidden');
}

const color = ["red", "yellow", "green", "blue"];
let cells = document.getElementsByClassName('cell');
let newGame = document.getElementById('new-game');
let grid = document.getElementById('grid');
let ui = document.getElementById('sudoku');
let isGameStarted = false;
let sudoku;