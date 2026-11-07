function texture(scene, key, width, height, paint) {
  if (scene.textures.exists(key)) return;
  const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
  paint(graphics);
  graphics.generateTexture(key, width, height);
  graphics.destroy();
}

export function createGameTextures(scene) {
  texture(scene, 'hero-idle', 24, 32, (g) => {
    g.fillStyle(0x24314f).fillRect(5, 8, 14, 20);
    g.fillStyle(0xf4be86).fillRect(6, 3, 12, 12);
    g.fillStyle(0x402c43).fillRect(5, 2, 14, 5).fillRect(4, 5, 3, 5);
    g.fillStyle(0x26324e).fillRect(8, 13, 9, 3);
    g.fillStyle(0xffd166).fillRect(7, 17, 10, 4);
    g.fillStyle(0x435b78).fillRect(5, 26, 6, 5).fillRect(14, 26, 6, 5);
    g.fillStyle(0xffffff).fillRect(14, 8, 2, 3);
  });
  texture(scene, 'hero-run', 24, 32, (g) => {
    g.fillStyle(0x24314f).fillRect(5, 8, 14, 18);
    g.fillStyle(0xf4be86).fillRect(6, 3, 12, 12);
    g.fillStyle(0x402c43).fillRect(5, 2, 14, 5).fillRect(4, 5, 3, 5);
    g.fillStyle(0xffd166).fillRect(7, 17, 10, 4);
    g.fillStyle(0x435b78).fillRect(4, 25, 6, 6).fillRect(14, 24, 6, 5);
    g.fillStyle(0xffffff).fillRect(14, 8, 2, 3);
  });
  texture(scene, 'hero-air', 24, 32, (g) => {
    g.fillStyle(0x24314f).fillRect(5, 8, 14, 18);
    g.fillStyle(0xf4be86).fillRect(6, 3, 12, 12);
    g.fillStyle(0x402c43).fillRect(5, 2, 14, 5).fillRect(4, 5, 3, 5);
    g.fillStyle(0xffd166).fillRect(7, 17, 10, 4);
    g.fillStyle(0x435b78).fillRect(2, 22, 7, 5).fillRect(15, 22, 7, 5);
    g.fillStyle(0xffffff).fillRect(14, 8, 2, 3);
  });
  texture(scene, 'enemy', 28, 24, (g) => {
    g.fillStyle(0x372c43).fillRect(3, 8, 22, 13);
    g.fillStyle(0xd96868).fillRect(5, 5, 18, 12);
    g.fillStyle(0xf29b7e).fillRect(8, 2, 12, 8);
    g.fillStyle(0xffffff).fillRect(9, 8, 3, 4).fillRect(17, 8, 3, 4);
    g.fillStyle(0x382842).fillRect(10, 11, 2, 2).fillRect(18, 11, 2, 2);
    g.fillStyle(0x382842).fillRect(5, 19, 6, 4).fillRect(18, 19, 6, 4);
  });
  texture(scene, 'coin', 16, 20, (g) => {
    g.fillStyle(0xb86737).fillRect(4, 1, 8, 18);
    g.fillStyle(0xffd166).fillRect(3, 2, 10, 16);
    g.fillStyle(0xffec9c).fillRect(5, 4, 3, 12);
    g.fillStyle(0xf6a947).fillRect(9, 5, 2, 9);
  });
  texture(scene, 'spike', 20, 18, (g) => {
    g.fillStyle(0x472e4a).fillRect(0, 13, 20, 5);
    g.fillStyle(0xff815f).fillTriangle(2, 14, 7, 2, 11, 14).fillTriangle(9, 14, 14, 1, 19, 14);
  });
  texture(scene, 'portal', 38, 68, (g) => {
    g.fillStyle(0x29315b).fillRoundedRect(2, 2, 34, 64, 15);
    g.fillStyle(0x7d70dd).fillRoundedRect(6, 5, 26, 58, 12);
    g.fillStyle(0xb6f4e3).fillRoundedRect(11, 10, 16, 48, 8);
    g.fillStyle(0xffffff, 0.8).fillRect(14, 17, 3, 19);
    g.fillStyle(0xf6d977).fillCircle(19, 34, 5);
  });
  texture(scene, 'platform', 32, 32, (g) => {
    g.fillStyle(0x302d49).fillRect(0, 3, 32, 29);
    g.fillStyle(0x6ab48a).fillRect(0, 0, 32, 8);
    g.fillStyle(0x99d18b).fillRect(2, 0, 7, 3).fillRect(17, 1, 8, 3);
    g.fillStyle(0x4f896c).fillRect(0, 8, 32, 3);
    g.fillStyle(0x514464).fillRect(5, 15, 5, 3).fillRect(21, 22, 7, 3);
    g.fillStyle(0x403752).fillRect(13, 11, 3, 4);
  });
}
