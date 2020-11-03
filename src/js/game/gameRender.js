export default class RenderGame {    
    /** @param {HTMLCanvasElement} canvas*/
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.SetCanvasSize(width, height)
    }
    SetCanvasSize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
    }
    SetCanvasStyleSize(width, height){
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
    }
    ClearRender() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    DrawBackground(color = "white"){
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    SetPixelColor(color){
        this.context.fillStyle = color;
    }
    DrawPixel(x, y) {
        this.context.fillRect(x, y, 1, 1);
    }
    DrawPixelColor(color, x, y){
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
    }
}