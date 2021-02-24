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

  /*
   * Gets game ready for play
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }
}
