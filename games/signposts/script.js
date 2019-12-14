setCanvasFromId('gameCanvas');

var x = 0;
var b = 0;

function draw(delta) {
    stroke(255);
    fill(255);
    rect(0, 0, 400, 400);
    stroke(0);
    fill(0);
    text(x, 100, 100);
}

function every(a){
    x=a-b;
    b=a;
    if(a>10000){
        x = 42069;
        stopLoop();
    }
}

schedule(every, 30);
initializeGameLoop(draw);