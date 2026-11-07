import ResultsScene from './ResultsScene.js';

export default class GameOverScene extends ResultsScene {
  constructor() {
    super('GameOverScene');
    this.title = 'TRY AGAIN';
    this.titleColor = '#ffae98';
    this.primaryLabel = 'RESTART LEVEL';
    this.onPrimary = () => this.scene.start('GameScene', { levelIndex: this.levelIndex, score: this.score });
  }

  subtitle(name) {
    return `THE TRAIL ENDS HERE FOR NOW  •  ${name.toUpperCase()}`;
  }
}
