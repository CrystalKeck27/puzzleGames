setCanvasFromId('gameCanvas');
var whoWon;
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
    if (!playing) {
        background(175, 175, 175, 0.7);
        strokeWeight(1);
        gfx.ctx.textAlign = "center";
        gfx.ctx.textBaseline = "middle";
        gfx.ctx.font = "30px Arial";
        text("Click anywhere to play again", 225, 260);
        if (whoWon == 0) {
            text("DRAW!", 225, 190);
        } else if (whoWon == 1) {
            text("X WINS!", 225, 190);
        } else if (whoWon == 2) {
            text("O WINS!", 225, 190);
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
    } else {
        reset();
    }
};

function checkForWin() {
    for (let i = 0; i < 3; i++) {
        if (data[i][0] == data[i][1] && data[i][1] == data[i][2] && data[i][0] !== 0) {
            whoWon = data[i][0];
            playing = false;
            return;
        }
        if (data[0][i] == data[1][i] && data[1][i] == data[2][i] && data[0][i] !== 0) {
            whoWon = data[0][i];
            playing = false;
            return;
        }
    }
    if (data[0][0] == data[1][1] && data[1][1] == data[2][2] && data[1][1] !== 0) {
        whoWon = data[1][1];
        playing = false;
        return;
    }
    if (data[2][0] == data[1][1] && data[1][1] == data[0][2] && data[1][1] !== 0) {
        whoWon = data[1][1];
        playing = false;
        return;
    }
    let isDraw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (data[j][i] === 0) {
                isDraw = false;
                return;
            }
        }
    }
    if (isDraw) {
        whoWon = 0;
        playing = false;
    }
}

function reset() {
    playing = true;
    isXTurn = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            data[j][i] = 0;
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