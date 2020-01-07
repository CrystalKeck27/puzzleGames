setCanvasFromId("gameCanvas");
var msgBox = document.getElementById("msgBox");

let rows = 6, cols = 6;
let grid = [];
for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
    }
}


function render() {
    background(255);
    let w = getWidth() / cols, h = getHeight() / rows;
    stroke(0);
    fill(255);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            switch (grid[i][j]) {
                case 0:
                    fill(127);
                    break;
                case 1:
                    fill(32);
                    break;
                case 2:
                    fill(247);
                    break;
                default:
                    fill(127);
                    break;
            }
            rect(w * i, h * j, w, h);
        }
    }
}

initializeGameLoop(render);

gfx.cnv.onclick = function (e) {
    let x = e.offsetX / window.devicePixelRatio;
    let y = e.offsetY / window.devicePixelRatio;
    x /= getWidth() / cols;
    y /= getHeight() / rows;
    x = Math.floor(x);
    y = Math.floor(y);
    grid[x][y]++;
    if (grid[x][y] == 3) grid[x][y] = 0;
}

function autofill() {
    for (let i = 0; i < cols; i++) {
        if (getColData(i)[1] >= cols / 2) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j] == 0) grid[i][j] = 2;
            }
        }
        if (getColData(i)[2] >= cols / 2) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j] == 0) grid[i][j] = 1;
            }
        }
    }
    for (let i = 0; i < rows; i++) {
        if (getRowData(i)[1] >= rows / 2) {
            for (let j = 0; j < cols; j++) {
                if (grid[j][i] == 0) grid[j][i] = 2;
            }
        }
        if (getRowData(i)[2] >= rows / 2) {
            for (let j = 0; j < cols; j++) {
                if (grid[j][i] == 0) grid[j][i] = 1;
            }
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            
        }
    }
}

function getRowData(row) {
    let count = [0, 0, 0];
    for (let i = 0; i < cols; i++) {
        count[grid[i][row]]++;
    }
    return count;
}

function getColData(col) {
    let count = [0, 0, 0];
    for (let i = 0; i < rows; i++) {
        count[grid[col][i]]++;
    }
    return count;
}