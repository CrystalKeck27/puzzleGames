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
    for (let i = 0; i < rows; y++) {
        temp.push(...grid[y]);
    }
    for (let i = 0; i < numMines; i++) {

    }
}