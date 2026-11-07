import Phaser from 'phaser';
import AudioManager from '../systems/AudioManager.js';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.health = 3;
    this.invulnerableUntil = 0;
    this.jumpPressed = false;
    this.coyoteUntil = 0;
    this.sprite = scene.physics.add.sprite(x, y, 'hero-idle');
    this.sprite.setDepth(5);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0);
    this.sprite.body.setSize(17, 26).setOffset(3, 5);
    this.sprite.body.setMaxVelocity(250, 900);
  }

  update(keys, controls, time) {
    const body = this.sprite.body;
    const left = keys.left.isDown || keys.a.isDown || controls.left;
    const right = keys.right.isDown || keys.d.isDown || controls.right;
    const jump = keys.jump.isDown || keys.up.isDown || keys.w.isDown || controls.jump;
    if (body.blocked.down || body.touching.down) this.coyoteUntil = time + 110;

    if (left !== right) {
      body.setVelocityX(left ? -220 : 220);
      this.sprite.setFlipX(left);
    } else {
      body.setVelocityX(0);
    }

    if (jump && !this.jumpPressed && time <= this.coyoteUntil) {
      body.setVelocityY(-555);
      this.coyoteUntil = 0;
      AudioManager.play('jump');
    }
    this.jumpPressed = jump;

    if (body.velocity.y < -20) this.sprite.setTexture('hero-air');
    else if (body.velocity.y > 20) this.sprite.setTexture('hero-air');
    else if (Math.abs(body.velocity.x) > 10) {
      this.sprite.setTexture(Math.floor(time / 120) % 2 ? 'hero-run' : 'hero-idle');
    } else {
      this.sprite.setTexture('hero-idle');
    }
    this.sprite.setAlpha(time < this.invulnerableUntil && Math.floor(time / 85) % 2 === 0 ? 0.4 : 1);
  }

  takeDamage(time, sourceX) {
    if (time < this.invulnerableUntil) return false;
    this.health -= 1;
    this.invulnerableUntil = time + 1150;
    this.sprite.setVelocity(sourceX < this.sprite.x ? 300 : -300, -310);
    AudioManager.play('hurt');
    return true;
  }

  destroy() {
    this.sprite.destroy();
  }
}
