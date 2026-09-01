export class Canvas {
  constructor(canvasId, width, height) {
    this.element = document.getElementById(canvasId);
    this.ctx = this.element.getContext("2d");
    this.element.width = width;
    this.element.height = height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }
}
