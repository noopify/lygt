var PIXI = require('pixi.js');

var renderer = new PIXI.WebGLRenderer(800, 600, {
  resolution: window.devicePixelRatio
});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var noopTexture = PIXI.Texture.fromImage('noop.png');
var noop = new PIXI.Sprite(noopTexture);

noop.position.x = 100;
noop.position.y = 100;

stage.addChild(noop);

animate();

function animate() {
  requestAnimationFrame(animate);

  noop.rotation += 0.01;

  renderer.render(stage);
}
