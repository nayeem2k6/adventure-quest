import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('adventure-background', '/assets/adventure-background.jpg');
  }

  create() {
    this.scene.start('MenuScene');
  }
}
