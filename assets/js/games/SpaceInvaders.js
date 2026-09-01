import { BaseGame } from "./BaseGame.js";

export class SpaceInvaders extends BaseGame {
  init() {
    this.player = { x: 380, y: 440, width: 40, height: 20 };
    this.bullets = [];
    this.enemies = [];
    this.score = 0;
    this.isGameOver = false;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        this.enemies.push({
          x: 100 + j * 70,
          y: 50 + i * 40,
          width: 30,
          height: 20,
        });
      }
    }
  }

  update(dt) {
    if (this.isGameOver) return;

    if (this.input.isPressed("ArrowLeft") && this.player.x > 0)
      this.player.x -= 4;
    if (this.input.isPressed("ArrowRight") && this.player.x < 760)
      this.player.x += 4;

    if (this.input.isPressed("KeyZ") && this.bullets.length < 3) {
      this.bullets.push({
        x: this.player.x + 18,
        y: this.player.y,
        width: 4,
        height: 10,
      });
      this.sound.playBeep(800, "sine", 0.05);
    }

    for (let b = this.bullets.length - 1; b >= 0; b--) {
      let bullet = this.bullets[b];
      bullet.y -= 7;

      for (let e = this.enemies.length - 1; e >= 0; e--) {
        let enemy = this.enemies[e];
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          this.enemies.splice(e, 1);
          this.bullets.splice(b, 1);
          this.score += 20;
          this.sound.playBeep(300, "square", 0.1);
          break;
        }
      }

      if (bullet && bullet.y < 0) this.bullets.splice(b, 1);
    }
  }

  render() {
    this.ctx.fillStyle = "#05050a";
    this.ctx.fillRect(0, 0, 800, 500);

    this.ctx.fillStyle = "#00f3ff";
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
    );

    this.ctx.fillStyle = "#ff0055";
    this.bullets.forEach((b) => this.ctx.fillRect(b.x, b.y, b.width, b.height));

    this.ctx.fillStyle = "#9d00ff";
    this.enemies.forEach((e) => this.ctx.fillRect(e.x, e.y, e.width, e.height));
  }
}
