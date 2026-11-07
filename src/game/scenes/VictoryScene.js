import ResultsScene from './ResultsScene.js';
import AudioManager from '../systems/AudioManager.js';

export default class VictoryScene extends ResultsScene {
  constructor() {
    super('VictoryScene');
    this.title = 'YOU DID IT!';
    this.titleColor = '#b6f4e3';
    this.primaryLabel = 'PLAY AGAIN';
    this.onPrimary = () => {
      AudioManager.startMusic();
      this.scene.start('GameScene', { levelIndex: 0, score: 0 });
    };
  }

  subtitle() {
    return 'ALL THREE TRAILS CONQUERED  •  YOU ARE A LEGEND';
  }
}
