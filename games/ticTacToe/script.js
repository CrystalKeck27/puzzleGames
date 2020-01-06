setCanvasFromId('gameCanvas')
rect(150, 0, 5, 450);
rect(300, 0, 5, 450);
rect(0, 150, 450, 5);
rect(0, 300, 450, 5);
var x, y;
gfx.cnv.onclick = function(e){
    x = e.offsetX;
    y = e.offsetY;
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
            //middle middle
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
/* function draw(){
    ellipse(x, y, 100, 100);
}

initializeGameLoop(draw); */