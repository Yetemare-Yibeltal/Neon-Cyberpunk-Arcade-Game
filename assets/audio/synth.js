export function playPowerupSound(soundFX) {
  soundFX.playBeep(523.25, "sine", 0.1); // C5
  setTimeout(() => soundFX.playBeep(659.25, "sine", 0.1), 100); // E5
  setTimeout(() => soundFX.playBeep(783.99, "sine", 0.2), 200); // G5
}
