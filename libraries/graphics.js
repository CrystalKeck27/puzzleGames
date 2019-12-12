var gfx = {
    //the reference to the canvas
    cnv: null,
    //the reference to the context
    ctx: null,
    //the base transform (needed for hiDPI transformations)
    transform: null
}

function setCanvas(canvas, hiDPI = true) {
    gfx.cnv = canvas;
    updateContext();
    if (hiDPI) makeHiDPI();
    if (gfx.transform === null) {
        var temp = gfx.ctx.getTransform();
        gfx.ctx.resetTransform();
        gfx.transform = gfx.ctx.getTransform();
        gfx.ctx.setTransform(temp);
    }
}

function makeHiDPI() {
    if (window.devicePixelRatio > 1) {
        var canvasWidth = gfx.cnv.width;
        var canvasHeight = gfx.cnv.height;

        gfx.cnv.width = canvasWidth * window.devicePixelRatio;
        gfx.cnv.height = canvasHeight * window.devicePixelRatio;
        gfx.cnv.style.width = canvasWidth;
        gfx.cnv.style.height = canvasHeight;

        gfx.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        gfx.transform = gfx.ctx.getTransform();
    }
}

function updateContext() {
    gfx.ctx = gfx.cnv.getContext('2d');
}

function setCanvasFromId(id, hiDPI = true) {
    setCanvas(document.getElementById(id), hiDPI);
}

function rect(x, y, width, height) {
    gfx.ctx.fillRect(x, y, width, height);
}

function resetTransform() {
    gfx.ctx.setTransform(gfx.transform);
}

function transform(tform) {
    gfx.ctx.transform(tform);
}

function scale(tform) {
    gfx.ctx.scale(tform);
}

function translate(tform) {
    gfx.ctx.translate(tform);
}

function rotate(tform) {
    gfx.ctx.rotate(tform);
}

function fill(a, b, c) {
    if (typeof(a) == 'string') {
        gfx.ctx.fillStyle = a;
    } else if (typeof(a) == 'number' && a < 256 && a >= 0) {
        if ((typeof(b) == 'number' && b < 256 && b >= 0) && (typeof(c) == 'number' && c < 256 && c >= 0)) {
            gfx.ctx.fillStyle = 'rgb(' + a + ',' + b + ',' + c + ')';
        } else if (!b && !c) {
            gfx.ctx.fillStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
        } else throw Error('Invalid params for fill call');
    } else throw Error('Invalid params for fill call');
}

function stroke(a, b, c) {
    if (typeof(a) == 'string') {
        gfx.ctx.strokeStyle = a;
    } else if (typeof(a) == 'number' && a < 256 && a >= 0) {
        if ((typeof(b) == 'number' && b < 256 && b >= 0) && (typeof(c) == 'number' && c < 256 && c >= 0)) {
            gfx.ctx.strokeStyle = 'rgb(' + a + ',' + b + ',' + c + ')';
        } else if (!b && !c) {
            gfx.ctx.strokeStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
        } else throw Error('Invalid params for stroke call');
    } else throw Error('Invalid params for stroke call');
}
