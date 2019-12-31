/*---- GRAPHICS LIBRARY ----*/

//  Stores variables needed for the library
var gfx = {
    //the reference to the canvas
    cnv: null,
    //the reference to the context
    ctx: null,
    //the base transform (needed for hiDPI transformations)
    transform: null
};

//  Sets the canvas, context, and transform for future use
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

//  Makes the canvas support high definition displays
//  Called automatically when the canvas is created
//  It does this by scaling up with html then down with css
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


//  Updates the context, called by setCanvas
function updateContext() {
    gfx.ctx = gfx.cnv.getContext('2d');
}

//  Sets the canvas given its id
function setCanvasFromId(id, hiDPI = true) {
    setCanvas(document.getElementById(id), hiDPI);
}

// Draws a rectangle on the current context
function rect(x, y, width, height) {
    gfx.ctx.beginPath();
    gfx.ctx.rect(x, y, width, height);
    gfx.ctx.closePath();
    gfx.ctx.fill();
    gfx.ctx.stroke();
}

// Resets the transform to the base transform
function resetTransform() {
    gfx.ctx.setTransform(gfx.transform);
}

// Calls transform on the current context
function transform(tform) {
    gfx.ctx.transform(tform);
}

// Calls scale on the current context
function scale(x, y) {
    gfx.ctx.scale(x, y);
}

// Calls translate on the current context
function translate(x, y) {
    gfx.ctx.translate(x, y);
}

// Calls rotate on the current context
function rotate(angle) {
    gfx.ctx.rotate(angle);
}

function push() {

}

//  Changes what color shapes are filled with
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

//  Changes what color strokes are drawn with
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

//  Draws an ellipse
function ellipse(x, y, width, height, rotation, startAngle, endAngle, counterclockwise) {
    if (!height) height = width;
    gfx.ctx.beginPath();
    gfx.ctx.ellipse(x, y, width, height, rotation, startAngle, endAngle, counterclockwise);
    gfx.ctx.closePath();
    gfx.ctx.fill();
    gfx.ctx.stroke();
}

// Draws a line
function line(x1, y1, x2, y2) {
    gfx.ctx.beginPath();
    gfx.ctx.moveTo(x1, y1);
    gfx.ctx.lineTo(x2, y2);
    gfx.ctx.closePath();
    gfx.ctx.stroke();
}

//  Draws a polygon
function poly(ptArr) {
    gfx.ctx.beginPath();
    gfx.ctx.moveTo(ptArr[ptArr.length].x, ptArr[ptArr.length].y);
    for (var i = 0; i < ptArr.length; i++) {
        gfx.ctx.lineTo(ptArr[i].x, ptArr[i].y);
    }
    gfx.ctx.closePath();
    gfx.ctx.stroke();
    gfx.ctx.fill();
}

//  Draws text
function text(str, x, y) {
    gfx.ctx.fillText(str, x, y);
    gfx.ctx.strokeText(str, x, y);
}

//  Changes the width of all lines drawn
function strokeWeight(width) {
    gfx.ctx.lineWidth = width;
}