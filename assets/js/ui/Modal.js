export class Modal {
  constructor(overlayId) {
    this.element = document.getElementById(overlayId);
  }

  show(title, score) {
    document.getElementById("overlay-title").innerText = title;
    document.getElementById("overlay-score").innerText = `Score: ${score}`;
    this.element.classList.remove("hidden");
  }

  hide() {
    this.element.classList.add("hidden");
  }
}
