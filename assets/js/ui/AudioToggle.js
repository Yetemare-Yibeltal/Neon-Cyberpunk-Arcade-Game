export class AudioToggle {
  constructor(buttonId, soundEngine) {
    this.btn = document.getElementById(buttonId);
    this.sound = soundEngine;
    this.btn.addEventListener("click", () => {
      this.sound.muted = !this.sound.muted;
      this.btn.innerText = this.sound.muted ? "🔇" : "🔊";
    });
  }
}
