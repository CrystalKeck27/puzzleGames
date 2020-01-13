/*---- GRAPHICS LIBRARY ----*/

//  Stores variables needed for the library
var gfx = {
    //the reference to the canvas
    cnv: null,
    //the reference to the context
    ctx: null,
    //the base transform (needed for hiDPI transformations)
    transform: null,
    //stores other drawing data
    otherData: [{
        doStroke: true,
        doFill: true
    }],
    //tells drawing functions what to draw
    doStroke: true,
    doFill: true
};

//  Update doStroke and doFill
function updateDrawingData() {
    let data = gfx.otherData[gfx.otherData.length - 1];
    Object.assign(gfx, data);
}

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
        if (gfx.cnv.dataset.width == null) {
            gfx.cnv.dataset.width = gfx.cnv.width;
            gfx.cnv.dataset.height = gfx.cnv.height;
        }
        gfx.cnv.width = gfx.cnv.dataset.width * window.devicePixelRatio;
        gfx.cnv.height = gfx.cnv.dataset.height * window.devicePixelRatio;
        gfx.cnv.style.width = gfx.cnv.dataset.width + "px";
        gfx.cnv.style.height = gfx.cnv.dataset.height + "px";

        gfx.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        gfx.transform = gfx.ctx.getTransform();
    }
    window.onresize = makeHiDPI;
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
    if (gfx.doFill) gfx.ctx.fill();
    if (gfx.doStroke) gfx.ctx.stroke();
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

//  Remembers drawing data
function push() {
    gfx.ctx.save();
    gfx.otherData.push(gfx.otherData[gfx.otherData.length - 1]);
    updateDrawingData()
}

//  Restores drawing data from last unrestored save
function pop() {
    gfx.ctx.restore();
    gfx.otherData.pop();
    updateDrawingData();
}

//  Don't fill things in
function noFill(){
    gfx.doFill = false;
}

//  Changes what color shapes are filled with
function fill(a, b, c, d) {
    gfx.doFill = true;
    if (typeof(a) == 'string') {
        gfx.ctx.fillStyle = a;
    } else if (typeof(a) == 'number' && a < 256 && a >= 0) {
        if ((typeof (b) == 'number' && b < 256 && b >= 0) && (typeof (c) == 'number' && c < 256 && c >= 0)) {
            if (typeof (d) == 'number' && d <=1 && d >= 0) {
                gfx.ctx.fillStyle = 'rgba(' + a + ',' + b + ',' + c + ',' + d + ')';
            } else {
                gfx.ctx.fillStyle = 'rgb(' + a + ',' + b + ',' + c + ')';
            }
        } else if (!b && !c) {
            gfx.ctx.fillStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
        } else throw Error('Invalid params for fill call');
    } else if(a != undefined) throw Error('Invalid params for fill call');
}

//  Don't draw lines
function noStroke(){
    gfx.doStroke = false;
}

//  Changes what color strokes are drawn with
function stroke(a, b, c, d) {
    gfx.doStroke = true;
    if (typeof(a) == 'string') {
        gfx.ctx.strokeStyle = a;
    } else if (typeof(a) == 'number' && a < 256 && a >= 0) {
        if ((typeof (b) == 'number' && b < 256 && b >= 0) && (typeof (c) == 'number' && c < 256 && c >= 0)) {
            if (typeof (d) == 'number' && d <= 1 && d >= 0) {
                gfx.ctx.fillStyle = 'rgba(' + a + ',' + b + ',' + c + ',' + d + ')';
            } else {
                gfx.ctx.fillStyle = 'rgb(' + a + ',' + b + ',' + c + ')';
            }
        } else if (!b && !c) {
            gfx.ctx.strokeStyle = 'rgb(' + a + ',' + a + ',' + a + ')';
        } else throw Error('Invalid params for stroke call');
    } else if (a != undefined) throw Error('Invalid params for stroke call');
}

//  Draws an ellipse
function ellipse(x, y, width, height, rotation = 0, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false) {
    if (!height) height = width;
    gfx.ctx.beginPath();
    gfx.ctx.ellipse(x, y, width, height, rotation, startAngle, endAngle, counterclockwise);
    gfx.ctx.closePath();
    if (gfx.doFill) gfx.ctx.fill();
    if (gfx.doStroke) gfx.ctx.stroke();
}

// Draws a line
function line(x1, y1, x2, y2) {
    gfx.ctx.beginPath();
    gfx.ctx.moveTo(x1, y1);
    gfx.ctx.lineTo(x2, y2);
    gfx.ctx.closePath();
    if (gfx.doStroke) gfx.ctx.stroke();
}

//  Draws a polygon
function poly(ptArr) {
    gfx.ctx.beginPath();
    gfx.ctx.moveTo(ptArr[ptArr.length].x, ptArr[ptArr.length].y);
    for (var i = 0; i < ptArr.length; i++) {
        gfx.ctx.lineTo(ptArr[i].x, ptArr[i].y);
    }
    gfx.ctx.closePath();
    if (gfx.doStroke) gfx.ctx.stroke();
    if (gfx.doFill) gfx.ctx.fill();
}

//  Draws text
function text(str, x, y) {
    if (gfx.doFill) gfx.ctx.fillText(str, x, y);
    if (gfx.doStroke) gfx.ctx.strokeText(str, x, y);
}

//  Changes the width of all lines drawn
function strokeWeight(width) {
    gfx.ctx.lineWidth = width;
}

//  Returns the width of the canvas
function getWidth() {
    return gfx.cnv.width / window.devicePixelRatio;
}

//  Returns the height of the canvas
function getHeight() {
    return gfx.cnv.height / window.devicePixelRatio;
}

//  Draws background
function background(a, b, c, d) {
    push();
    resetTransform();
    fill(a, b, c, d);
    gfx.ctx.fillRect(0, 0, getWidth(), getHeight());
    pop();
}