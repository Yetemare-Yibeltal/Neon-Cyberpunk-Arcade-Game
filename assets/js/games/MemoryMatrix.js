import { BaseGame } from "./BaseGame.js";

export class MemoryMatrix extends BaseGame {
  init() {
    this.sequence = [];
    this.playerSequence = [];
    this.level = 1;
    this.score = 0;
    this.isGameOver = false;
    this.nextRound();
  }

  nextRound() {
    this.playerSequence = [];
    this.sequence.push(Math.floor(Math.random() * 4));
  }

  update(dt) {}

  render() {
    this.ctx.fillStyle = "#0a0a12";
    this.ctx.fillRect(0, 0, 800, 500);

    const colors = ["#00f3ff", "#ff0055", "#9d00ff", "#ffe600"];
    const positions = [
      { x: 250, y: 100 },
      { x: 450, y: 100 },
      { x: 250, y: 300 },
      { x: 450, y: 300 },
    ];

    positions.forEach((pos, i) => {
      this.ctx.fillStyle = colors[i];
      this.ctx.fillRect(pos.x, pos.y, 120, 120);
    });
  }
}
