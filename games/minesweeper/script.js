setCanvasFromId("gameCanvas");
//class definitions
class Cell {
    constructor(isMine, isCovered, isFlagged, adjacentMines) {
        this.isMine = isMine;
        this.isCovered = isCovered;
        this.isFlagged = isFlagged;
        this.adjacentMines = adjacentMines;
    }
}
//variable definitions
var rows, cols, numMines;
var grid = [];

reset(8, 8, 10);
render();

function render() {
    background(255);
    fill(255);
    stroke(0);
    let w = getWidth() / cols;
    let h = getHeight() / rows;
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            rect(x * w, y * h, w, h);
        }
    }
}

//util functions
function reset(rowsParam, colsParam, numMinesParam) {
    rows = rowsParam;
    cols = colsParam;
    numMines = numMinesParam;
    for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
            grid[y][x] = new Cell();
        }
    }
}

function generate() {
    if (numMines > rows * cols) throw RangeError("Too many mines");
    let temp = [];
    for (let i = 0; i < rows; i++) {
        temp.push(...grid[i]);
    }
    for (let i = 0; i < numMines; i++) {

    }
}