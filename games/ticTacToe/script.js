setCanvasFromId('gameCanvas');
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
        
    }
}

gfx.cnv.onclick = function(e) {
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
};

function checkForWin() {
    for (let i = 0; i < 3; i++) {
        if (data[i][0] == data[i][1] && data[i][1] == data[i][2]); {
            gfx.cnv.onclick = null;
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