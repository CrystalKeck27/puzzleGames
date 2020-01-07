setCanvasFromId('gameCanvas');
strokeWeight(5);
line(150, 0, 150, 450);
line(300, 0, 300, 450);
line(0, 150, 450, 150);
line(0, 300, 450, 300);
var x, y;
var whatToDraw = 0
gfx.cnv.onclick = function(e) {
    x = e.offsetX;
    y = e.offsetY;
    console.log(x, y);
    if (x < 150) {
        if (y < 150) {
            //top left
            if (whatToDraw === 0) {
                drawAnX(75, 75);
            } else {
                drawAnO(75, 75);
            }
        } else if (y > 150 && y < 300) {
            //middle left
            if (whatToDraw === 0) {
                drawAnX(75, 225);
            } else {
                drawAnO(75, 225);
            }
        } else if (y > 300) {
            //bottom left
            if (whatToDraw === 0) {
                drawAnX(75, 375);
            } else {
                drawAnO(75, 375);
            }
        }
} else if (x > 150 && x < 300) {
        if (y < 150) {
            //top middle
            if (whatToDraw === 0) {
                drawAnX(225, 75);
            } else {
                drawAnO(225, 75);
            }
        } else if (y > 150 && y < 300) {
            //middle middle
            if (whatToDraw === 0) {
                drawAnX(225, 225);
            } else {
                drawAnO(225, 225);
            }
        } else if (y > 300) {
            //bottom middle
            if (whatToDraw === 0) {
                drawAnX(225, 375);
            } else {
                drawAnO(225, 375);
            }
        }
    } else if (x > 300) {
        if (y < 150) {
            //top right
            if (whatToDraw === 0) {
                drawAnX(375, 75);
            } else {
                drawAnO(375, 75);
            }
        } else if (y > 150 && y < 300) {
            //middle right
            if (whatToDraw === 0) {
                drawAnX(375, 225);
            } else {
                drawAnO(375, 225);
            }
        } else if (y > 300) {
            //bottom right
            if (whatToDraw === 0) {
                drawAnX(375, 375);
            } else {
                drawAnO(375, 375);
            }
        }
    }
    if (whatToDraw === 0) {
        whatToDraw = 1
    } else {
        whatToDraw = 0
    }
}

function drawAnO(x, y) {
    ellipse(x, y, 65, 65);
}

function drawAnX(x, y) {
    line(x + 65, y + 65, x - 65, y - 65);
    line(x - 65, y + 65, x + 65, y - 65);
}