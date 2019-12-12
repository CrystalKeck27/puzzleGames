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
        console.log(a, typeof(a));
        console.log(b, typeof(b));
        console.log(c, typeof(c));
        if (typeof(a) == 'string') gfx.ctx.fillStyle = a;
        //if (typeof(a) == 'number')
    }