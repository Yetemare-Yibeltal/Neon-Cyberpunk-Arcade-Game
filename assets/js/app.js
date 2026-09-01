import { Canvas } from "./engine/Canvas.js";
import { InputHandler } from "./engine/InputHandler.js";
import { SoundFX } from "./engine/SoundFX.js";
import { GameLoop } from "./engine/GameLoop.js";
import { Storage } from "./engine/Storage.js";
import { NeonRunner } from "./games/NeonRunner.js";
import { SpaceInvaders } from "./games/SpaceInvaders.js";
import { MemoryMatrix } from "./games/MemoryMatrix.js";
import { Modal } from "./ui/Modal.js";
import { AudioToggle } from "./ui/AudioToggle.js";
import { LeaderboardUI } from "./ui/LeaderboardUI.js";

const canvas = new Canvas("game-canvas", 800, 500);
const input = new InputHandler();
const sound = new SoundFX();
const modal = new Modal("ui-overlay");
new AudioToggle("audio-toggle", sound);

let currentGameKey = "runner";
let currentGame = new NeonRunner(canvas, input, sound);
currentGame.init();

const loop = new GameLoop(
  (dt) => {
    currentGame.update(dt);
    if (currentGame.isGameOver) {
      Storage.saveScore(currentGameKey, currentGame.score);
      modal.show("GAME OVER", currentGame.score);
    }
  },
  () => currentGame.render(),
);

loop.start();

// Tab selection listeners
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".nav-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    currentGameKey = e.target.dataset.game;

    if (currentGameKey === "runner")
      currentGame = new NeonRunner(canvas, input, sound);
    if (currentGameKey === "space")
      currentGame = new SpaceInvaders(canvas, input, sound);
    if (currentGameKey === "memory")
      currentGame = new MemoryMatrix(canvas, input, sound);

    modal.hide();
    currentGame.init();
  });
});

document.getElementById("restart-btn").addEventListener("click", () => {
  modal.hide();
  currentGame.init();
});

document.getElementById("leaderboard-btn").addEventListener("click", () => {
  LeaderboardUI.display();
});
