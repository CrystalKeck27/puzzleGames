setCanvasFromId("gameCanvas");
var msgBox = document.getElementById("msgBox");

let rows = 8, cols = 8;
let grid = [];
for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
    }
}


function render() {
    background(255, 0, 0);
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

gfx.cnv.onclick = function(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    x /= 50;
    y /= 50;
    x = Math.floor(x);
    y = Math.floor(y);
    grid[x][y]++;
    if (grid[x][y] == 3) grid[x][y] = 0;
}

function check() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            
        }
    }
}