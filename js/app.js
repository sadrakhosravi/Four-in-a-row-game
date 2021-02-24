const game = new Game();
const startBtn = document.querySelector('#begin-game');

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
startBtn.addEventListener('click', function () {
  game.startGame();

  this.style.display = 'none';
  document.querySelector('#play-area').style.opacity = '1';
});

document.addEventListener('keydown', function (e) {
  game.handleKeydown(e);
});
