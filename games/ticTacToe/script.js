setCanvasFromId('gameCanvas');
strokeWeight(5);
line(150, 0, 150, 450);
line(300, 0, 300, 450);
line(0, 150, 450, 150);
line(0, 300, 450, 300);
var x, y;
gfx.cnv.onclick = function(e) {
    x = e.offsetX;
    y = e.offsetY;
    console.log(x, y);
    if (x < 150) {
        if (y < 150) {
            //top left
        } else if (y > 150 && y < 300) {
            //middle left
        } else if (y < 300) {
            //bottom left
        }
    } else if (x > 150 && x < 300) {
        if (y < 150) {
            //top middle
        } else if (y > 150 && y < 300) {
            drawAnX(225, 225, 130, 130);
        } else if (y < 300) {
            //bottom middle
        }
    } else if (x > 300) {
        if (y < 150) {
            //top right
        } else if (y > 150 && y < 300) {
            //middle right
        } else if (y < 300) {
            //bottom right
        }
    }
}

function drawAnX(x, y, width, height) {
    line(x + width / 2, y + height / 2, x - width / 2, y - height / 2);
    line(x - width / 2, y + height / 2, x + width / 2, y - height / 2);
}