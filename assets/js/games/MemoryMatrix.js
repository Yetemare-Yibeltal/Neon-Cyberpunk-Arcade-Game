import { BaseGame } from "./BaseGame.js";

export class MemoryMatrix extends BaseGame {
  init() {
    this.sequence = [];
    this.playerSequence = [];
    this.activeTile = null;
    this.score = 0;
    this.isGameOver = false;
    this.isShowingSequence = false;

    this.tiles = [
      { id: 0, x: 250, y: 100, color: "#00f3ff", freq: 261.63 }, // C4
      { id: 1, x: 450, y: 100, color: "#ff0055", freq: 329.63 }, // E4
      { id: 2, x: 250, y: 300, color: "#9d00ff", freq: 392.0 }, // G4
      { id: 3, x: 450, y: 300, color: "#ffe600", freq: 523.25 }, // C5
    ];

    this.clickHandler = this.handleClick.bind(this);
    this.canvas.element.addEventListener("click", this.clickHandler);

    this.nextRound();
  }

  nextRound() {
    this.playerSequence = [];
    this.sequence.push(Math.floor(Math.random() * 4));
    this.playSequence();
  }

  playSequence() {
    this.isShowingSequence = true;
    let step = 0;

    const interval = setInterval(() => {
      const tileId = this.sequence[step];
      this.flashTile(tileId);
      step++;
      if (step >= this.sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.isShowingSequence = false;
        }, 600);
      }
    }, 800);
  }

  flashTile(tileId) {
    this.activeTile = tileId;
    this.sound.playBeep(this.tiles[tileId].freq, "triangle", 0.25);
    setTimeout(() => {
      this.activeTile = null;
    }, 400);
  }

  handleClick(e) {
    if (this.isShowingSequence || this.isGameOver) return;

    const rect = this.canvas.element.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    this.tiles.forEach((tile) => {
      if (
        mx >= tile.x &&
        mx <= tile.x + 120 &&
        my >= tile.y &&
        my <= tile.y + 120
      ) {
        this.flashTile(tile.id);
        this.playerSequence.push(tile.id);
        this.checkInput();
      }
    });
  }

  checkInput() {
    const index = this.playerSequence.length - 1;
    if (this.playerSequence[index] !== this.sequence[index]) {
      this.isGameOver = true;
      this.sound.playBeep(120, "sawtooth", 0.5);
      this.canvas.element.removeEventListener("click", this.clickHandler);
      return;
    }

    if (this.playerSequence.length === this.sequence.length) {
      this.score += 50;
      setTimeout(() => this.nextRound(), 1000);
    }
  }

  update(dt) {}

  render() {
    this.ctx.fillStyle = "#0a0a12";
    this.ctx.fillRect(0, 0, 800, 500);

    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "20px monospace";
    this.ctx.fillText(
      `Round: ${this.sequence.length} | Score: ${this.score}`,
      280,
      50,
    );

    this.tiles.forEach((tile) => {
      this.ctx.fillStyle = this.activeTile === tile.id ? "#ffffff" : tile.color;
      this.ctx.shadowColor = tile.color;
      this.ctx.shadowBlur = this.activeTile === tile.id ? 30 : 10;
      this.ctx.fillRect(tile.x, tile.y, 120, 120);
      this.ctx.shadowBlur = 0;
    });
  }
}
