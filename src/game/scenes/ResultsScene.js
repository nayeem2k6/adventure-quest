import Phaser from 'phaser';
import LevelManager from '../systems/LevelManager.js';
import AudioManager from '../systems/AudioManager.js';
import { addPanel, createButton } from '../ui/components.js';
import addPhotoBackground from '../ui/PhotoBackground.js';

export default class ResultsScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  init(data) {
    this.levelIndex = data.levelIndex ?? 0;
    this.score = data.score ?? 0;
    this.levelName = data.levelName ?? LevelManager.get(this.levelIndex).name;
  }

  create() {
    this.drawBackdrop();
    addPanel(this, 480, 270, 530, 360, 0.96);
    this.add.text(480, 163, this.title, {
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '38px', color: this.titleColor, fontStyle: 'bold',
      stroke: '#10172b', strokeThickness: 5
    }).setOrigin(0.5).setDepth(9);
    this.add.text(480, 213, this.subtitle(this.levelName), {
      fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#d8def1', letterSpacing: 2
    }).setOrigin(0.5).setDepth(9);
    this.add.text(480, 257, `TOTAL SCORE     ${String(this.score).padStart(4, '0')}`, {
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', color: '#ffe081', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(9);
    this.addResultButtons();
  }

  drawBackdrop() {
    addPhotoBackground(this, 0.48);
  }

  subtitle(name) {
    return `TRAIL COMPLETE  •  ${name.toUpperCase()}`;
  }

  addResultButtons() {
    const button = createButton(this, 480, 322, 270, 48, this.primaryLabel, this.onPrimary, {
      fill: 0x345f62, hoverFill: 0x487c75, border: 0xb0d39f
    });
    createButton(this, 480, 383, 270, 42, 'MAIN MENU', () => {
      AudioManager.stopMusic();
      this.scene.start('MenuScene');
    }, { fill: 0x28324d, hoverFill: 0x3c527e, border: 0x7183b2, fontSize: '14px' });
    this.add.text(480, 433, 'ADVENTURE QUEST   ·   KEEP EXPLORING', {
      fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#8997bb', letterSpacing: 2
    }).setOrigin(0.5).setDepth(9);
    return button;
  }
}
