/*---- GRAPHICS LIBRARY ----*/

//  Variables
var cnv = null;
var ctx = null;
var transform = null;

//  Sets the canvas, context, and transform for future use
function setCanvas(canvas, hiDPI = true) {
    cnv = canvas;
    updateContext();
    if (hiDPI) makeHiDPI();
    if (transform === null) {
        var temp = ctx.getTransform();
        ctx.resetTransform();
        transform = ctx.getTransform();
        ctx.setTransform(temp);
    }
}

//  Makes the canvas support high definition displays
//  Called automatically when the canvas is created
//  It does this by scaling up with html then down with css
function makeHiDPI() {
    if (window.devicePixelRatio > 1) {
        if (cnv.dataset.width == null) {
            cnv.dataset.width = cnv.width;
            cnv.dataset.height = cnv.height;
        }
        cnv.width = cnv.dataset.width * window.devicePixelRatio;
        cnv.height = cnv.dataset.height * window.devicePixelRatio;
        cnv.style.width = cnv.dataset.width + "px";
        cnv.style.height = cnv.dataset.height + "px";

        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        transform = ctx.getTransform();
    }
    window.onresize = makeHiDPI;
}


//  Updates the context, called by setCanvas
function updateContext() {
    ctx = cnv.getContext('2d');
}

//  Sets the canvas given its id
function setCanvasFromId(id, hiDPI = true) {
    setCanvas(document.getElementById(id), hiDPI);
}

// Draws a rectangle on the current context
function rect(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Resets the transform to the base transform
function resetTransform() {
    ctx.setTransform(transform);
}

// Calls transform on the current context
function transform(tform) {
    ctx.transform(tform);
}

// Calls scale on the current context
function scale(x, y) {
    ctx.scale(x, y);
}

// Calls translate on the current context
function translate(x, y) {
    ctx.translate(x, y);
}

// Calls rotate on the current context
function rotate(angle) {
    ctx.rotate(angle);
}

//  Changes what color shapes are filled with
function fill(a, b, c, d) {
    if (typeof(a) == 'string' || typeof(a) != 'number') {
        ctx.fillStyle = a;
    } else if (typeof(a) == 'number' && a < 256 && a >= 0) {
        if ((typeof (b) == 'number' && b < 256 && b >= 0) && (typeof (c) == 'number' && c < 256 && c >= 0)) {
            if (typeof (d) == 'number' && d <=1 && d >= 0) {
                ctx.fillStyle = 'rgba(' + a + ',' + b + ',' + c + ',' + d + ')';
            } else {
                ctx.fillStyle = 'rgb(' + a + ',' + b + ',' + c + ')';
            }
        } else if (!b && !c) {
            ctx.fillStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
        } else throw Error('Invalid params for fill call');
    } else if(a != undefined) throw Error('Invalid params for fill call');
}

//  Changes what color strokes are drawn with
function stroke(a, b, c, d){
    if (typeof(a) == 'string' || typeof(a) != 'number') {
        ctx.strokeStyle = a;
    } else if (typeof(a) == 'number' && a < 256 && a >= 0) {
        if ((typeof (b) == 'number' && b < 256 && b >= 0) && (typeof (c) == 'number' && c < 256 && c >= 0)) {
            if (typeof (d) == 'number' && d <= 1 && d >= 0) {
                ctx.fillStyle = 'rgba(' + a + ',' + b + ',' + c + ',' + d + ')';
            } else {
                ctx.fillStyle = 'rgb(' + a + ',' + b + ',' + c + ')';
            }
        } else if (!b && !c) {
            ctx.strokeStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
        } else throw Error('Invalid params for stroke call');
    } else if (a != undefined) throw Error('Invalid params for stroke call');
}

//  Draws an ellipse
function ellipse(x, y, width, height, rotation = 0, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false) {
    if (!height) height = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.ellipse(x, y, width, height, rotation, startAngle, endAngle, counterclockwise);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Draws a line
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

//  Draws a polygon
function poly(ptArr) {
    ctx.beginPath();
    ctx.moveTo(ptArr[ptArr.length].x, ptArr[ptArr.length].y);
    for (var i = 0; i < ptArr.length; i++) {
        ctx.lineTo(ptArr[i].x, ptArr[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

//  Draws text
function text(str, x, y) {
    ctx.fillText(str, x, y);
    ctx.strokeText(str, x, y);
}

//  Changes the width of all lines drawn
function strokeWeight(width) {
    ctx.lineWidth = width;
}

//  Returns the width of the canvas
function getWidth() {
    return cnv.width / window.devicePixelRatio;
}

//  Returns the height of the canvas
function getHeight() {
    return cnv.height / window.devicePixelRatio;
}

//  Draws background
function background(a, b, c, d) {
    push();
    resetTransform();
    fill(a, b, c, d);
    ctx.fillRect(0, 0, getWidth(), getHeight());
    pop();
}