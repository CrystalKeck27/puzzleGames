//Some spacial startup things to allow fullscreen
setCanvasFromId("gameCanvas");
document.onclick = function () {
    gfx.cnv.requestFullscreen({ navigationUI: "hide" });
}

document.onfullscreenchange = function () {
    if (document.fullscreenElement == null) {uyuyt
        document.getElementById("msgBox").innerHTML = "Game Paused";
        document.onclick = function () {
            gfx.cnv.requestFullscreen({ navigationUI: "hide" });
        }
    } else {
        setupScreen();
    }
}

function setupScreen() {
    document.onclick = null;
    while (!document.hasFocus()) gfx.cnv.focus();
    gfx.cnv.dataset.width = screen.width;
    gfx.cnv.dataset.height = screen.height;
    makeHiDPI();
    setup();
}

//Variables
var hasStarted = false;
var currentState = 0;

//Functions
function setup() {
    if (hasStarted) {
        initializeGameLoop(render);
    } else {
        initializeGameLoop(render);
        hasStarted = true;
    }
}

function stop() {
    stopLoop();
}

function render() {
    background(255);
}