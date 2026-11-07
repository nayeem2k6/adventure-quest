import AudioManager from '../systems/AudioManager.js';

export default class Coin {
  constructor(scene, x, y) {
    this.scene = scene;
    this.collected = false;
    this.sprite = scene.physics.add.sprite(x, y, 'coin');
    this.sprite.body.allowGravity = false;
    this.sprite.setDepth(3);
    this.tween = scene.tweens.add({
      targets: this.sprite,
      y: y - 7,
      duration: 540,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut'
    });
  }

  collect() {
    if (this.collected) return false;
    this.collected = true;
    this.tween.stop();
    this.sprite.destroy();
    AudioManager.play('coin');
    return true;
  }
}
