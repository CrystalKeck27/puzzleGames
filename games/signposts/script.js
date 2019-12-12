setCanvasFromId('gameCanvas');
function draw(delta) {
    stroke(255);
    fill(255);
    rect(0, 0, 400, 400);
    stroke(0);
    fill(0);
    text(1000/delta, 100, 100);
}

initializeDeltaGameLoop(draw);