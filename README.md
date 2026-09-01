# CyberPulse: Neon Cyberpunk Arcade

An advanced, interactive web arcade built from scratch with **Vanilla JavaScript (ES Modules)**, **HTML5 Canvas**, **Web Audio API**, and **Custom CSS CRT Shaders**. Designed specifically as a software engineering portfolio piece demonstrating framework-free OOP architecture, physics rendering, dynamic synth audio, and particle systems.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/tech-HTML5--Canvas--ES6-neon)

---

## 🎮 Arcade Games

1. **Neon Runner**: Real-time 2D jump physics, collision detection, acceleration, and interactive particle explosions.
2. **Space Defense**: Bullet physics matrix engine with grid target collision detection and score tracking.
3. **Memory Matrix**: Simon-style audio-visual sequence generator utilizing dynamic Web Audio pitch playback and canvas click targets.

---

## 🛠 Architectural Highlights

- **Modular ES6 Architecture**: Over 30 organized files separation across `/engine`, `/games`, `/ui`, and `/audio`.
- **Custom Game Loop**: Frame-rate independent `requestAnimationFrame` delta-time loop (`GameLoop.js`).
- **Zero Dependencies**: Pure native browser APIs without external libraries or package bundlers.
- **Audio Synthesizer**: Programmatic audio effects and ambient synth soundtrack using Web Audio API nodes (`SoundFX.js`, `BgmSynth.js`).
- **Data Persistence**: Automatic high score persistence using LocalStorage API (`Storage.js`).

---

## 🚀 Live Demo & Local Setup

### Run Locally

No build step required! Simply clone and serve:

```bash
git clone [https://github.com/Yetemare-Yibeltal/simple-login-form.git](https://github.com/Yetemare-Yibeltal/simple-login-form.git)
cd simple-login-form
# Open index.html directly in any modern browser or use Live Server
```
