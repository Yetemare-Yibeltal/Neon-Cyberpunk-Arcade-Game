export class BaseGame {
  constructor(canvas, input, sound) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.input = input;
    this.sound = sound;
    this.score = 0;
    this.isGameOver = false;
  }

  init() {}
  update(dt) {}
  render() {}
}