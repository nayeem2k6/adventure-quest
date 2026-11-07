import ResultsScene from './ResultsScene.js';
import LevelManager from '../systems/LevelManager.js';

export default class LevelCompleteScene extends ResultsScene {
  constructor() {
    super('LevelCompleteScene');
    this.title = 'TRAIL CLEARED!';
    this.titleColor = '#ffe081';
    this.primaryLabel = 'NEXT TRAIL  →';
    this.onPrimary = () => this.scene.start('GameScene', { levelIndex: this.levelIndex + 1, score: this.score });
  }

  subtitle(name) {
    return `${name.toUpperCase()} COMPLETE  •  ${this.levelIndex + 1} OF ${LevelManager.count()}`;
  }
}
