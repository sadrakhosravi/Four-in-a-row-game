class Game {
  constructor() {
    this.board = new Board();
    this.player = this.createPlayers();
    this.ready = false;
  }

  /**
   * Returns active player
   * @return {Object} Player - the active player.
   */
  get activePlayer() {
    return this.player.find(player => player.active);
  }

  /**
   * Creates two player objects
   * @return  {Array}    An array of two Player objects.
   */
  createPlayers() {
    let player1 = prompt("Please enter first player's name");

    while (player1 === '') {
      player1 = prompt("Name cannot be empty! Please enter first player's name.");
    }

    if (player1 === null) {
      player1 = 'Player1';
    }

    let player2 = prompt("Please enter second player's name");
    while (player2 === '') {
      player2 = prompt("Name cannot be empty! Please enter second player's name.");
    }

    if (player2 === null) {
      player2 = 'Player2';
    }

    const players = [new Player(player1, '#e15258', 1, true), new Player(player2, '#e59a13', 2)];

    return players;
  }

  /**
   * Outputs current player's name on the screen
   */
  activePlayerText() {
    const activePlayerName = this.activePlayer.name;
    const playerText = document.querySelector('.player');
    playerText.style.display = 'block';
    playerText.textContent = `${activePlayerName}'s turn`;
  }

  /**
   * Hides the active player's name
   */
  hideActivePlayerText() {
    document.querySelector('.player').style.display = 'none';
  }

  /**
   * Branches code, depending on what key player presses
   * @param   {Object}    e - Keydown event object
   */
  handleKeydown(e) {
    if (this.ready) {
      if (e.key === 'ArrowRight') {
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (e.key === 'ArrowLeft') {
        //Token moves left
        this.activePlayer.activeToken.moveLeft();
      } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        //Drop token
        this.playToken();
      }
    }
  }

  /*
   * Checks for the first available space from bottom in the targetColumn and will drop the token in the space.
   */
  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;

    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }

    if (targetSpace !== null) {
      const game = this;
      game.ready = false;

      activeToken.drop(targetSpace, function () {
        game.updateGameState(activeToken, targetSpace);
      });
    }
  }

  /**
   * Switches active player.
   */
  switchPlayers() {
    for (let player of this.player) {
      if (player.active === true) {
        player.active = false;
      } else {
        player.active = true;
      }
    }
  }

  /*
   * Gets game ready for play
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.activePlayerText();
    this.ready = true;
  }

  /**
   * Checks if there a winner on the board after each token drop.
   * @param   {Object}    target - Targeted space for dropped token.
   * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */
  checkForWin(target) {
    const owner = target.token.owner;
    let win = false;

    //Horizontal winning check
    for (let x = 0; x < this.board.columns - 3; x++) {
      for (let y = 0; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x + 1][y].owner === owner &&
          this.board.spaces[x + 2][y].owner === owner &&
          this.board.spaces[x + 3][y].owner === owner
        ) {
          win = true;
        }
      }
    }

    //Vertical winning check
    for (let x = 0; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x][y + 1].owner === owner &&
          this.board.spaces[x][y + 2].owner === owner &&
          this.board.spaces[x][y + 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    //Diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 0; y < this.board.rows - 3; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y + 1].owner === owner &&
          this.board.spaces[x - 2][y + 2].owner === owner &&
          this.board.spaces[x - 3][y + 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    //Diagonal
    for (let x = 3; x < this.board.columns; x++) {
      for (let y = 3; y < this.board.rows; y++) {
        if (
          this.board.spaces[x][y].owner === owner &&
          this.board.spaces[x - 1][y - 1].owner === owner &&
          this.board.spaces[x - 2][y - 2].owner === owner &&
          this.board.spaces[x - 3][y - 3].owner === owner
        ) {
          win = true;
        }
      }
    }

    return win;
  }

  /**
   * Updates game state after token is dropped.
   * @param   {Object}  token  -  The token that's being dropped.
   * @param   {Object}  target -  Targeted space for dropped token.
   */
  updateGameState(token, target) {
    target.mark(token);

    if (!this.checkForWin(target)) {
      this.switchPlayers();

      if (this.activePlayer.checkTokens()) {
        this.activePlayer.activeToken.drawHTMLToken();
        this.activePlayerText();
        this.ready = true;
      } else {
        this.gameOver('You are out of tokens!');
        this.hideActivePlayerText();
      }
    } else {
      this.gameOver(`${target.owner.name} wins! 🎉`);
      this.hideActivePlayerText();
    }
  }

  /**
   * Displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver(message) {
    const messageHTMLEl = document.querySelector('#game-over');
    messageHTMLEl.style.display = 'block';
    messageHTMLEl.textContent = message;
  }
}
