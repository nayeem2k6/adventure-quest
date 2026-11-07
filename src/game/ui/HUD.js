import AudioManager from '../systems/AudioManager.js';

export default class HUD {
  constructor(scene, controls, callbacks) {
    this.scene = scene;
    this.controls = controls;
    this.callbacks = callbacks;
    this.scoreText = scene.add.text(28, 22, '', this.textStyle(18)).setScrollFactor(0).setDepth(20);
    this.levelText = scene.add.text(480, 23, '', this.textStyle(13, '#d4ddf8')).setOrigin(0.5, 0).setScrollFactor(0).setDepth(20);
    this.healthText = scene.add.text(28, 53, '', this.textStyle(18, '#ffb1a7')).setScrollFactor(0).setDepth(20);
    this.pauseButton = scene.add.text(860, 22, 'Ⅱ  PAUSE', this.textStyle(13))
      .setOrigin(1, 0).setScrollFactor(0).setDepth(20).setInteractive({ useHandCursor: true });
    this.pauseButton.on('pointerdown', () => callbacks.pause());
    this.soundButton = scene.add.text(930, 22, AudioManager.enabled ? '♫' : '×', this.textStyle(18))
      .setOrigin(1, 0).setScrollFactor(0).setDepth(20).setInteractive({ useHandCursor: true });
    this.soundButton.on('pointerdown', () => {
      AudioManager.setEnabled(!AudioManager.enabled);
      if (AudioManager.enabled) AudioManager.startMusic();
      this.soundButton.setText(AudioManager.enabled ? '♫' : '×');
    });
    this.createTouchControls();
  }

  textStyle(size, color = '#fff4d1') {
    return { fontFamily: 'Space Grotesk, sans-serif', fontSize: `${size}px`, color, fontStyle: 'bold' };
  }

  createTouchControls() {
    if (!this.scene.sys.game.device.input.touch) return;
    this.addTouchButton(105, 458, '‹', 'left');
    this.addTouchButton(225, 458, '›', 'right');
    this.addTouchButton(855, 458, '↑', 'jump');
  }

  addTouchButton(x, y, label, control) {
    const shape = this.scene.add.circle(x, y, 54, 0x1e2b4d, 0.72)
      .setStrokeStyle(2, 0xb7c7ef, 0.7)
      .setScrollFactor(0).setDepth(20)
      .setInteractive({ useHandCursor: true });
    this.scene.add.text(x, y - 1, label, this.textStyle(26))
      .setOrigin(0.5).setScrollFactor(0).setDepth(21);
    shape.on('pointerdown', (pointer) => {
      pointer.event?.preventDefault?.();
      this.controls[control] = true;
    });
    const release = () => { this.controls[control] = false; };
    shape.on('pointerup', release);
    shape.on('pointerout', release);
  }

  update(score, health, levelName, levelNumber) {
    this.scoreText.setText(`✦  ${String(score).padStart(4, '0')}`);
    this.healthText.setText(`♥  ${'♥'.repeat(health)}${'♡'.repeat(Math.max(0, 3 - health))}`);
    this.levelText.setText(`${levelNumber}  /  3     ${levelName.toUpperCase()}`);
  }
}
