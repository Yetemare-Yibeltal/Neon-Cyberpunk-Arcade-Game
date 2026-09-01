import { BaseGame } from "./BaseGame.js";

export class NeonRunner extends BaseGame {
  init() {
    this.player = {
      x: 50,
      y: 350,
      width: 30,
      height: 30,
      vy: 0,
      grounded: true,
    };
    this.obstacles = [];
    this.timer = 0;
    this.score = 0;
    this.isGameOver = false;
  }

  update(dt) {
    if (this.isGameOver) return;

    if (this.input.isPressed("Space") && this.player.grounded) {
      this.player.vy = -12;
      this.player.grounded = false;
      this.sound.playBeep(600, "square", 0.15);
    }

    this.player.vy += 0.6; // Gravity
    this.player.y += this.player.vy;

    if (this.player.y >= 350) {
      this.player.y = 350;
      this.player.vy = 0;
      this.player.grounded = true;
    }

    this.timer += dt;
    if (this.timer > 1.5) {
      this.timer = 0;
      this.obstacles.push({ x: 800, y: 350, width: 20, height: 30 });
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      let obs = this.obstacles[i];
      obs.x -= 5;

      // Collision check
      if (
        this.player.x < obs.x + obs.width &&
        this.player.x + this.player.width > obs.x &&
        this.player.y < obs.y + obs.height &&
        this.player.y + this.player.height > obs.y
      ) {
        this.isGameOver = true;
        this.sound.playBeep(150, "sawtooth", 0.4);
      }

      if (obs.x < -20) {
        this.obstacles.splice(i, 1);
        this.score += 10;
      }
    }
  }

  render() {
    this.ctx.fillStyle = "#0a0a12";
    this.ctx.fillRect(0, 0, 800, 500);

    // Ground
    this.ctx.strokeStyle = "#00f3ff";
    this.ctx.beginPath();
    this.ctx.moveTo(0, 380);
    this.ctx.lineTo(800, 380);
    this.ctx.stroke();

    // Player
    this.ctx.fillStyle = "#ff0055";
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
    );

    // Obstacles
    this.ctx.fillStyle = "#ffe600";
    this.obstacles.forEach((obs) =>
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height),
    );
  }
}
