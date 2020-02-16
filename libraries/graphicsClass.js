class ExtendedCanvas {
    constructor(reference) {
        //check if the reference is a string
        if (typeof (reference) == "string") {
            //set this.cnv to a reference to the canvas
            this.cnv = document.getElementById(reference);
            //throw an error if reference to the canvas was null
            if (!this.cnv) throw new Error("Invalid id");
            //throw an error if this.cnv was not a reference to a canvas
            if (this.cnv.toString() != "[object HTMLCanvasElement]") throw new Error("Id points to an element which is not a canvas");
            //set this.ctx to a reference to the context
            this.ctx = this.cnv.getContext("2d");
            //throw an error if reference to the context was null
            if (!this.ctx) throw new Error("Unable to get Context");
        } else if (reference.toString() == "[object HTMLCanvasElement]") {
            this.cnv = reference;
            this.ctx = this.cnv.getContext("2d");
            if (!this.ctx) throw new Error("Unable to get Context");
        } else if (reference.toString() == "[object CanvasRenderingContext2D") {
            this.ctx = reference;
            this.cnv = this.ctx.canvas;
            if(!this.cnv) throw new Error("Unable to get Canvas");
        }
    }
}