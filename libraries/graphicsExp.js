/*---- GRAPHICS LIBRARY ----*/

//  Variables
var cnv = null;
var ctx = null;
var transform = null; var width = undefined; var height = undefined;


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
    updateCanvasSizeVariables();
}

//  Makes the canvas support high definition displays
//  Called automatically when the canvas is created
//  It does this by scaling up with html then down with css
function makeHiDPI() {
    if (window.devicePixelRatio > 1) {
        if (cnv.dataset.width === null) {
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
function resizeCanvas(width, height) {

}

function updateCanvasSizeVariables() {
    width = cnv.width / window.devicePixelRatio();
    height = cnv.height / window.devicePixelRatio();
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

//  Calls save on the context
function push() {
    ctx.save();
}

//  Calls restore on the context
function pop() {
    ctx.restore();
}

//  Changes what color shapes are filled with
function fill(style) {
    ctx.fillStyle = style;
}

function noFill() {
    ctx.fillStyle = 'rgba(0,0,0,0)';
}

//  Changes what color strokes are drawn with
function stroke(style) {
    ctx.strokeStyle = style;
}

function noStroke() {
    ctx.strokeStyle = 'rgba(0,0,0,0)';
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

//  Draws background
function background(style) {
    push();
    resetTransform();
    fill(style);
    ctx.fillRect(0, 0, getWidth(), getHeight());
    pop();
}

//  Color functions
function rgb(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function rgba(r, g, b, a) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function createRadialGradient(x1, y1, r1, x2, y2, r2) {
    ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
}

function createConcentricRadialGradient(x, y, r1, r2) {
    ctx.createRadialGradient(x, y, r1, x, y, r2);
}

export {
    background,
    createConcentricRadialGradient,
    createRadialGradient,
    ellipse,
    fill,
    line,
    noFill,
    noStroke,
    poly,
    pop,
    push,
    rect,
    resetTransform,
    resizeCanvas,
    rgb,
    rgba,
    rotate,
    scale,
    setCanvas,
    setCanvasFromId,
    stroke,
    strokeWeight,
    text,
    transform,
    translate,
    width,
    height,
    //Not recommended, use only when needed
    cnv as currentCanvas,
    ctx as currentContext
}