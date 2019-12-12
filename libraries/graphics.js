var gfx = {
    //the reference to the canvas
    cnv: null,
    //the reference to the context
    ctx: null
}

function setCanvas(canvas){
    gfx.cnv = canvas;
    updateContext();
}

function updateContext(){
    gfx.cnv.getContext('2d');
}

function setCanvasFromId(id){
    setCanvas(document.getElementById(id));
}

function rect(x, y, width, height){
    gfx.ctx.fillRect(x, y, width, height);
}

