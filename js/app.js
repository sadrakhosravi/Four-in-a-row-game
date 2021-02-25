const startBtn = document.querySelector('#begin-game');
const restartBtn = document.querySelector('#restart-game');
const gameTitle = document.querySelector('.game-title');

const hideStartScreen = function () {
  gameTitle.classList.add('game-title-started');

  startBtn.style.display = 'none';
  document.querySelector('#play-area').style.opacity = '1';
};

/**
 * Initializes a new game instance and listens for keydown event
 */
const init = function () {
  hideStartScreen();

  const game = new Game();

  game.startGame();

  document.addEventListener('keydown', function (e) {
    game.handleKeydown(e);
  });
};

//After content loaded initialize the game.
document.addEventListener('DOMContentLoaded', function () {
  startBtn.addEventListener('click', init);
  restartBtn.addEventListener('click', () => {
    window.location.reload();
  });
});
