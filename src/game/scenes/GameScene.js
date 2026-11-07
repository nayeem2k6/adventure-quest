import Phaser from 'phaser';
import LevelManager from '../systems/LevelManager.js';
import AudioManager from '../systems/AudioManager.js';
import { createGameTextures } from '../systems/Art.js';
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import Coin from '../entities/Coin.js';
import HUD from '../ui/HUD.js';
import { addPanel, createButton } from '../ui/components.js';
import addPhotoBackground from '../ui/PhotoBackground.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelIndex = data.levelIndex ?? 0;
    this.score = data.score ?? 0;
    this.paused = false;
    this.finished = false;
    this.controls = { left: false, right: false, jump: false };
  }

  create() {
    this.level = LevelManager.get(this.levelIndex);
    createGameTextures(this);
    this.drawWorld();
    this.physics.world.setBounds(0, 0, this.level.width, 540);
    this.platforms = this.physics.add.staticGroup();
    for (const [x, y, width] of this.level.platforms) {
      const isGround = y >= 490;
      const platform = this.platforms.create(x + width / 2, isGround ? y + 20 : y + 11, 'platform');
      platform.setDisplaySize(width, isGround ? 50 : 26);
      platform.refreshBody();
    }

    this.player = new Player(this, this.level.start.x, this.level.start.y);
    this.physics.add.collider(this.player.sprite, this.platforms);
    this.cursors = this.input.keyboard.addKeys({
      left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', jump: 'SPACE', up: 'UP', w: 'W', escape: 'ESC', p: 'P'
    });
    this.input.keyboard.on('keydown-ESC', () => this.togglePause());
    this.input.keyboard.on('keydown-P', () => this.togglePause());

    this.coins = this.level.coins.map(([x, y]) => new Coin(this, x, y));
    this.coins.forEach((coin) => this.physics.add.overlap(this.player.sprite, coin.sprite, () => {
      if (coin.collect()) this.score += 10;
    }));

    this.enemies = this.level.enemies.map((data) => new Enemy(this, data));
    this.enemies.forEach((enemy) => {
      this.physics.add.collider(enemy.sprite, this.platforms);
      this.physics.add.overlap(this.player.sprite, enemy.sprite, () => this.handleEnemy(enemy));
    });

    this.hazards = [];
    for (const [x, y, width] of this.level.hazards) {
      for (let offset = 0; offset < width; offset += 20) {
        const spike = this.physics.add.staticImage(x + offset + 10, y - 9, 'spike');
        spike.setDepth(2);
        this.hazards.push(spike);
        this.physics.add.overlap(this.player.sprite, spike, () => this.damagePlayer());
      }
    }

    this.portal = this.physics.add.staticImage(this.level.exit, 461, 'portal').setDepth(3);
    this.physics.add.overlap(this.player.sprite, this.portal, () => this.completeLevel());
    this.cameras.main.setBounds(0, 0, this.level.width, 540);
    this.cameras.main.startFollow(this.player.sprite, true, 0.09, 0.09);
    this.cameras.main.setDeadzone(300, 150);
    this.hud = new HUD(this, this.controls, { pause: () => this.togglePause() });
    this.hud.update(this.score, this.player.health, this.level.name, this.levelIndex + 1);
    this.pauseObjects = [];
    AudioManager.startMusic();
  }

  drawWorld() {
    addPhotoBackground(this, 0.33);
  }

  handleEnemy(enemy) {
    if (!enemy.sprite.active || this.finished || this.paused) return;
    const body = this.player.sprite.body;
    if (body.velocity.y > 70 && this.player.sprite.y < enemy.sprite.y - 4) {
      enemy.defeat();
      this.score += 25;
      this.player.sprite.setVelocityY(-340);
      AudioManager.play('stomp');
      return;
    }
    this.damagePlayer(enemy.sprite.x);
  }

  damagePlayer(sourceX = this.player.sprite.x) {
    if (this.finished || this.paused) return;
    if (this.player.takeDamage(this.time.now, sourceX)) {
      if (this.player.health <= 0) this.endGame();
    }
  }

  togglePause() {
    if (this.finished) return;
    this.paused = !this.paused;
    this.physics.world.isPaused = this.paused;
    if (this.paused) {
      this.drawPausePanel();
      AudioManager.stopMusic();
    } else {
      this.pauseObjects.forEach((object) => object.destroy());
      this.pauseObjects = [];
      AudioManager.startMusic();
    }
  }

  drawPausePanel() {
    this.pauseObjects.push(addPanel(this, 480, 270, 430, 300, 0.96));
    this.pauseObjects.push(this.add.text(480, 190, 'TAKE A BREATHER', {
      fontFamily: 'Space Grotesk, sans-serif', fontSize: '30px', color: '#fff4d1', fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(9));
    const resume = createButton(this, 480, 253, 210, 48, 'RESUME', () => this.togglePause(), { depth: 10, fill: 0x345f62, border: 0xb0d39f });
    const restart = createButton(this, 480, 315, 210, 44, 'RESTART LEVEL', () => this.scene.restart({ levelIndex: this.levelIndex, score: this.score }), { depth: 10 });
    const menu = createButton(this, 480, 371, 210, 42, 'MAIN MENU', () => {
      AudioManager.stopMusic();
      this.scene.start('MenuScene');
    }, { depth: 10, fill: 0x28324d });
    this.pauseObjects.push(resume.background, resume.text, restart.background, restart.text, menu.background, menu.text);
  }

  completeLevel() {
    if (this.finished) return;
    this.finished = true;
    AudioManager.play('victory');
    AudioManager.stopMusic();
    const destination = this.levelIndex === LevelManager.count() - 1 ? 'VictoryScene' : 'LevelCompleteScene';
    this.scene.start(destination, { levelIndex: this.levelIndex, score: this.score, levelName: this.level.name });
  }

  endGame() {
    if (this.finished) return;
    this.finished = true;
    AudioManager.play('gameover');
    AudioManager.stopMusic();
    this.scene.start('GameOverScene', { levelIndex: this.levelIndex, score: this.score, levelName: this.level.name });
  }

  update(time) {
    if (this.paused || this.finished) return;
    this.player.update(this.cursors, this.controls, this.time.now);
    this.enemies.forEach((enemy) => {
      if (enemy.sprite.active) enemy.update();
    });
    if (this.player.sprite.y > 520) this.respawnFromPit();
    this.hud.update(this.score, this.player.health, this.level.name, this.levelIndex + 1);
  }

  respawnFromPit() {
    if (this.finished || this.time.now < this.player.invulnerableUntil) return;
    this.damagePlayer(this.player.sprite.x);
    if (!this.finished) {
      this.player.sprite.setPosition(this.level.start.x, this.level.start.y);
      this.player.sprite.setVelocity(0, 0);
    }
  }
}
