export function createButton(scene, x, y, width, height, label, onClick, options = {}) {
  const fill = options.fill ?? 0x28375a;
  const hoverFill = options.hoverFill ?? 0x3c527e;
  const border = options.border ?? 0x7183b2;
  const background = scene.add.rectangle(x, y, width, height, fill, 1)
    .setStrokeStyle(2, border, 0.88)
    .setDepth(options.depth ?? 10)
    .setScrollFactor(0);
  const text = scene.add.text(x, y, label, {
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: options.fontSize ?? '17px',
    fontStyle: 'bold',
    color: options.color ?? '#f7f5ff',
    align: 'center'
  }).setOrigin(0.5).setDepth((options.depth ?? 10) + 1).setScrollFactor(0);
  background.setInteractive({ useHandCursor: true });
  background.on('pointerover', () => background.setFillStyle(hoverFill, 1));
  background.on('pointerout', () => background.setFillStyle(fill, 1));
  background.on('pointerdown', () => {
    if (onClick) onClick();
  });
  return { background, text };
}

export function addPanel(scene, x, y, width, height, alpha = 0.93) {
  return scene.add.rectangle(x, y, width, height, 0x151d35, alpha)
    .setStrokeStyle(2, 0x7482b2, 0.6)
    .setDepth(8)
    .setScrollFactor(0);
}
