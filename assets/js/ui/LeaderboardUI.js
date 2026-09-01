import { Storage } from "../engine/Storage.js";

export class LeaderboardUI {
  static display() {
    const runnerScore = Storage.getScore("runner");
    const spaceScore = Storage.getScore("space");
    alert(
      `HIGH SCORES:\nNeon Runner: ${runnerScore}\nSpace Defense: ${spaceScore}`,
    );
  }
}
