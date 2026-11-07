import Phaser from 'phaser';

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export const gameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#182340',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1120 },
      debug: false
    }
  },
  render: {
    pixelArt: true,
    antialias: false,
    powerPreference: 'high-performance'
  }
};
