import Phaser from 'phaser';
import './style.css';
import { gameConfig } from './game/config.js';
import BootScene from './game/scenes/BootScene.js';
import MenuScene from './game/scenes/MenuScene.js';
import GameScene from './game/scenes/GameScene.js';
import GameOverScene from './game/scenes/GameOverScene.js';
import LevelCompleteScene from './game/scenes/LevelCompleteScene.js';
import VictoryScene from './game/scenes/VictoryScene.js';

new Phaser.Game({
  ...gameConfig,
  parent: 'game',
  scene: [BootScene, MenuScene, GameScene, GameOverScene, LevelCompleteScene, VictoryScene]
});
