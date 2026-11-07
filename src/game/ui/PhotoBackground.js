import { GAME_HEIGHT, GAME_WIDTH } from '../config.js';

export default function addPhotoBackground(scene, shade = 0.3) {
  scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'adventure-background')
    .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)
    .setScrollFactor(0)
    .setDepth(-10);

  scene.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x10172b, shade)
    .setOrigin(0)
    .setScrollFactor(0)
    .setDepth(-9);
}
