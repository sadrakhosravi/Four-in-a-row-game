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
    const players = [new Player('Player 1', '#e15258', 1, true), new Player('Player 2', '#e59a13', 2)];
    return players;
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
      game.ready = false;
      activeToken.drop(targetSpace);
    }
  }

  /*
   * Gets game ready for play
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }
}
