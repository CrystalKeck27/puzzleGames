setCanvasFromId('gameCanvas');
var xWon;
var playing = true;
var isXTurn = true;
var data = [];
for (let i = 0; i < 3; i++) {
    data[i] = [];
    for (let j = 0; j < 3; j++) {
        data[i][j] = 0;
    }
}

function render() {
    if (playing) {
        background(255);
        strokeWeight(5);
        noFill();
        line(150, 0, 150, 450);
        line(300, 0, 300, 450);
        line(0, 150, 450, 150);
        line(0, 300, 450, 300);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let px = j * 150 + 75;
                let py = i * 150 + 75;
                if (data[i][j] == 1) {
                    drawAnX(px, py);
                } else if (data[i][j] == 2) {
                    drawAnO(px, py);
                }
            }
        }
    } else {
        background(225);
        strokeWeight(1);
        gfx.ctx.textAlign = "center";
        gfx.ctx.font = "30px Arial";
        if (xWon) {
            text("X WINS!", 225, 225);
        } else {
            text("O WINS!", 225, 225);
        }
    }
}

gfx.cnv.onclick = function(e) {
    if (playing) {
        let x = e.offsetX;
        let y = e.offsetY;
        x /= 150;
        y /= 150;
        x = Math.floor(x);
        y = Math.floor(y);
        if (data[y][x] === 0) {
            if (isXTurn) {
                data[y][x] = 1;
            } else {
                data[y][x] = 2;
            }
            isXTurn = !isXTurn;
        }
        checkForWin();
    }
};

function checkForWin() {
    for (let i = 0; i < 3; i++) {
        if (data[i][0] == data[i][1] && data[i][1] == data[i][2] && data[i][0] !== 0) {
            if (data[i][0] == 1) {
                xWon = true;
            } else {
                xWon = false;
            }
            playing = false;
        }
        if (data[0][i] == data[1][i] && data[1][i] == data[2][i] && data[0][i] !== 0) {
            if (data[0][i] == 1) {
                xWon = true;
            } else {
                xWon = false;
            }
            playing = false;
        }
        if (data[0][0] == data[1][1] && data[1][1] == data[2][2] && data[1][1] !== 0) {
            if (data[0][i] == 1) {
                xWon = true;
            } else {
                xWon = false;
            }
            playing = false;
        }
        if (data[2][0] == data[1][1] && data[1][1] == data[0][2] && data[1][1] !== 0) {
            if (data[0][i] == 1) {
                xWon = true;
            } else {
                xWon = false;
            }
            playing = false;
        }
    }
    for (let j = 0; j < 3; j++) {
        for (let g = 0; g < 3; null) {
            if (data[j][g] === 0) {
                g++
            }
        }
    }
}

function drawAnO(x, y) {
    ellipse(x, y, 65);
}

function drawAnX(x, y) {
    line(x + 65, y + 65, x - 65, y - 65);
    line(x - 65, y + 65, x + 65, y - 65);
}

initializeGameLoop(render);