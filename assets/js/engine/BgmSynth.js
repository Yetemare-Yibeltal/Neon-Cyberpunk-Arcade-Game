export class BgmSynth {
  constructor(soundFX) {
    this.sound = soundFX;
    this.timer = null;
    this.notes = [130.81, 146.83, 164.81, 174.61, 196.0]; // C pentatonic bass
  }

  start() {
    if (this.timer) return;
    let step = 0;
    this.timer = setInterval(() => {
      if (!this.sound.muted) {
        const note = this.notes[step % this.notes.length];
        this.sound.playBeep(note, "sine", 0.4);
      }
      step++;
    }, 500);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}
