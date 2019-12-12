var gfx = {
    //the reference to the canvas
    cnv: null,
    //the reference to the context
    ctx: null,
    //the base transform (needed for hiDPI transformations)
    transform: null
}

function setCanvas(canvas, hiDPI = true){
    gfx.cnv = canvas;
    updateContext();
    if(hiDPI) makeHiDPI();
}

function makeHiDPI(){
    if (window.devicePixelRatio > 1) {
        var canvasWidth = gfx.cnv.width;
        var canvasHeight = gfx.cnv.height;
    
        gfx.cnv.width = canvasWidth * window.devicePixelRatio;
        gfx.cnv.height = canvasHeight * window.devicePixelRatio;
        gfx.cnv.style.width = canvasWidth;
        gfx.cnv.style.height = canvasHeight;
    
        gfx.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
}

function updateContext(){
    gfx.ctx = gfx.cnv.getContext('2d');
}

function setCanvasFromId(id, hiDPI = true){
    setCanvas(document.getElementById(id), hiDPI);
}

function rect(x, y, width, height){
    gfx.ctx.fillRect(x, y, width, height);
}

