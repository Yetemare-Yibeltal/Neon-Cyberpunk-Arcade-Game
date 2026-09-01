import { BaseGame } from "./BaseGame.js";
import { ParticleSystem } from "../engine/ParticleSystem.js";

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
    this.particles = new ParticleSystem();
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
      this.particles.emit(this.player.x + 15, this.player.y + 30, "#00f3ff", 8);
    }

    this.player.vy += 0.6;
    this.player.y += this.player.vy;

    if (this.player.y >= 350) {
      this.player.y = 350;
      this.player.vy = 0;
      this.player.grounded = true;
    }

    this.timer += dt;
    if (this.timer > 1.4) {
      this.timer = 0;
      this.obstacles.push({ x: 800, y: 350, width: 20, height: 30 });
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      let obs = this.obstacles[i];
      obs.x -= 6;

      if (
        this.player.x < obs.x + obs.width &&
        this.player.x + this.player.width > obs.x &&
        this.player.y < obs.y + obs.height &&
        this.player.y + this.player.height > obs.y
      ) {
        this.isGameOver = true;
        this.particles.emit(this.player.x, this.player.y, "#ff0055", 25);
        this.sound.playBeep(150, "sawtooth", 0.4);
      }

      if (obs.x < -20) {
        this.obstacles.splice(i, 1);
        this.score += 10;
      }
    }
    this.particles.update();
  }

  render() {
    this.ctx.fillStyle = "#0a0a12";
    this.ctx.fillRect(0, 0, 800, 500);

    this.ctx.strokeStyle = "#00f3ff";
    this.ctx.beginPath();
    this.ctx.moveTo(0, 380);
    this.ctx.lineTo(800, 380);
    this.ctx.stroke();

    this.ctx.fillStyle = "#ff0055";
    this.ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
    );

    this.ctx.fillStyle = "#ffe600";
    this.obstacles.forEach((obs) =>
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height),
    );

    this.particles.render(this.ctx);
  }
}
