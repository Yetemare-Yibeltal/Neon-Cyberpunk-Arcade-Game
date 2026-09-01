export class Storage {
  static getScore(gameKey) {
    const data = JSON.parse(localStorage.getItem("cyber_scores") || "{}");
    return data[gameKey] || 0;
  }

  static saveScore(gameKey, score) {
    const data = JSON.parse(localStorage.getItem("cyber_scores") || "{}");
    if (score > (data[gameKey] || 0)) {
      data[gameKey] = score;
      localStorage.setItem("cyber_scores", JSON.stringify(data));
    }
  }
}
