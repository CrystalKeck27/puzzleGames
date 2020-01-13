//Some spacial startup things to allow fullscreen
setCanvasFromId("gameCanvas");
document.onclick = function () {
    gfx.cnv.requestFullscreen({ navigationUI: "hide" }).then(setTimeout(setup, 250));
}
gfx.cnv.width = 0;
gfx.cnv.height = 0;

document.onfullscreenchange = function () {
    gfx.cnv.width = 0;
    gfx.cnv.height = 0;
    document.getElementById("msgBox").innerHTML = "Game Paused";
    document.onclick = function () {
        gfx.cnv.requestFullscreen({ navigationUI: "hide" }).then(setTimeout(setup, 250));
    }
}

function setupScreen() {
    document.onclick = null;
    gfx.cnv.width = screen.width;
    gfx.cnv.height = screen.height;
    gfx.cnv.focus();
    setup();
}

//Variables
var hasStarted = false;

//Functions
function setup() {
    if (hasStarted) {
        console.log("resume");
        initializeGameLoop(render);
    } else {
        console.log("startup");
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