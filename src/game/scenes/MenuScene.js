import Phaser from 'phaser';
import LevelManager from '../systems/LevelManager.js';
import AudioManager from '../systems/AudioManager.js';
import { addPanel, createButton } from '../ui/components.js';
import addPhotoBackground from '../ui/PhotoBackground.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.drawBackdrop();
    this.showLevels = false;
    this.soundLabel = this.add.text(914, 28, AudioManager.enabled ? '♫' : '×', {
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', color: '#fff4d1', fontStyle: 'bold'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.soundLabel.on('pointerdown', () => {
      AudioManager.setEnabled(!AudioManager.enabled);
      this.soundLabel.setText(AudioManager.enabled ? '♫' : '×');
      if (AudioManager.enabled) AudioManager.startMusic();
    });
    this.renderMenu();
    this.input.keyboard?.on('keydown-ENTER', () => {
      if (!this.showLevels) this.startLevel(0);
    });
  }

  drawBackdrop() {
    addPhotoBackground(this, 0.28);
    this.add.text(36, 506, 'A LITTLE PIXEL-ART ADVENTURE', {
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: '#edf2da', letterSpacing: 2
    }).setAlpha(0.72);
  }

  clearMenu() {
    this.menuObjects?.forEach((object) => object.destroy());
    this.menuObjects = [];
  }

  renderMenu() {
    this.clearMenu();
    if (this.showLevels) {
      this.renderLevelSelect();
      return;
    }
    this.menuObjects.push(
      this.add.text(480, 128, 'ADVENTURE', {
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '58px', color: '#fff4d1', fontStyle: 'bold',
        stroke: '#5b4969', strokeThickness: 8, shadow: { color: '#26314c', blur: 0, offsetX: 4, offsetY: 6, fill: true }
      }).setOrigin(0.5),
      this.add.text(480, 188, 'QUEST', {
        fontFamily: 'Space Grotesk, sans-serif', fontSize: '54px', color: '#ffe081', fontStyle: 'bold',
        stroke: '#8a593e', strokeThickness: 7, shadow: { color: '#26314c', blur: 0, offsetX: 4, offsetY: 6, fill: true }
      }).setOrigin(0.5),
      this.add.text(480, 239, 'A BRAVE LITTLE HERO. A VERY BIG WORLD.', {
        fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#f1f3de', letterSpacing: 2
      }).setOrigin(0.5)
    );
    const start = createButton(this, 480, 322, 228, 56, 'START ADVENTURE', () => {
      AudioManager.unlock();
      AudioManager.play('click');
      this.showLevels = true;
      this.renderMenu();
    }, { fill: 0x345f62, hoverFill: 0x487c75, border: 0xb0d39f, fontSize: '17px' });
    this.menuObjects.push(start.background, start.text);
    const howto = this.add.text(480, 392, 'MOVE  A / D  or  ← →     •     JUMP  SPACE / W / ↑', {
      fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#edf2da', letterSpacing: 1
    }).setOrigin(0.5);
    this.menuObjects.push(howto);
    const tip = this.add.text(480, 426, 'Collect the golden stars, bounce on baddies, find the portal.', {
      fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#d9e3ce'
    }).setOrigin(0.5);
    this.menuObjects.push(tip);
  }

  renderLevelSelect() {
    const panel = addPanel(this, 480, 286, 560, 330, 0.95);
    this.menuObjects.push(panel);
    this.menuObjects.push(this.add.text(480, 162, 'CHOOSE YOUR TRAIL', {
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '30px', color: '#fff4d1', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(9));
    const colors = [0x345f62, 0x744c76, 0x435c88];
    for (let i = 0; i < LevelManager.count(); i += 1) {
      const level = LevelManager.get(i);
      const button = createButton(this, 480, 225 + i * 76, 430, 58, `${String(i + 1).padStart(2, '0')}   ${level.name}`, () => this.startLevel(i), {
        fill: colors[i], hoverFill: 0x4c5f84, border: level.accent, fontSize: '18px'
      });
      this.menuObjects.push(button.background, button.text);
      this.menuObjects.push(this.add.text(480, 246 + i * 76, level.subtitle, {
        fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#d8def1', letterSpacing: 2
      }).setOrigin(0.5).setDepth(12));
    }
    const back = createButton(this, 480, 466, 130, 38, 'BACK', () => {
      this.showLevels = false;
      this.renderMenu();
    }, { fontSize: '13px', fill: 0x28324d, border: 0x687392 });
    this.menuObjects.push(back.background, back.text);
  }

  startLevel(levelIndex) {
    AudioManager.unlock();
    AudioManager.startMusic();
    this.scene.start('GameScene', { levelIndex, score: 0 });
  }
}
