//Some spacial startup things to allow fullscreen
setCanvasFromId("gameCanvas");
document.onclick = function () {
    gfx.cnv.requestFullscreen({ navigationUI: "hide" });
};

document.onfullscreenchange = function () {
    if (document.fullscreenElement == null) {
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
var mouseX = 0;
var mouseY = 0;

//Functions
function setup() {
    if (hasStarted) {
        initializeGameLoop(render);
    } else {
        initializeGameLoop(render);
        hasStarted = true;
    }
    document.onmousemove = function(e){
        mouseX = e.screenX;
        mouseY = e.screenY;
    }
    states[currentState].setup();
}

function stop() {
    stopLoop();
}

function render() {
    states[currentState].render();
}

function changeState(s){
    currentState = s;
    states[currentState].setup();
}

function wait(x){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, x);
    });
}