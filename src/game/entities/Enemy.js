export default class Enemy {
  constructor(scene, { x, min, max }) {
    this.min = min;
    this.max = max;
    this.direction = 1;
    this.sprite = scene.physics.add.sprite(x, 476, 'enemy');
    this.sprite.setDepth(4);
    this.sprite.body.setSize(22, 18).setOffset(3, 5);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setVelocityX(62);
    this.sprite.body.setMaxVelocity(90, 900);
    this.sprite.body.setBounce(0);
  }

  update() {
    if (this.sprite.x >= this.max) this.direction = -1;
    if (this.sprite.x <= this.min) this.direction = 1;
    this.sprite.setVelocityX(62 * this.direction);
    this.sprite.setFlipX(this.direction < 0);
  }

  defeat() {
    this.sprite.destroy();
  }
}
