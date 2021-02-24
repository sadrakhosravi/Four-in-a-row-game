class Token {
  constructor(index, owner) {
    this.owner = owner;
    this.id = `token-${index}-${this.owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
  }

  /**
   * Get associated HTML token.
   * @return  {element}  HTML element associated with the token.
   */
  get htmlToken() {
    return document.getElementById(this.id);
  }

  /**
   * Gets left offset of html element.
   * @return  {number}   Left offset of token object's htmlToken.
   */
  get offsetLeft() {
    return this.htmlToken.offsetLeft;
  }

  drawHTMLToken() {
    const tokenDiv = document.createElement('div');
    const gameBoardUnderlay = document.querySelector('#game-board-underlay');
    gameBoardUnderlay.appendChild(tokenDiv);

    tokenDiv.setAttribute('id', this.id);
    tokenDiv.setAttribute('class', 'token');
    tokenDiv.style.backgroundColor = this.owner.color;
  }

  /**
   * Moves html token one column to left.
   */
  moveLeft() {
    if (this.columnLocation > 0) {
      this.htmlToken.style.left = this.offsetLeft - 76;
      this.columnLocation -= 1;
    }
  }

  /**
   * Moves html token one column to right.
   * @param   {number}    columns - number of columns in the game board
   */
  moveRight(columns) {
    if (this.columnLocation < columns - 1) {
      this.htmlToken.style.left = this.offsetLeft + 76;
      this.columnLocation += 1;
    }
  }

  /**
   * Drops html token into targeted board space.
   * @param   {Object}   target - Targeted space for dropped token.
   * @param   {function} reset  - The reset function to call after the drop animation has completed.
   */
  drop(target, reset) {
    this.dropped = true;

    //jQuery Drop Animation
    $(this.htmlToken).animate(
      {
        top: target.y * target.diameter,
      },
      750,
      'easeOutBounce',
      reset,
    );
  }
}
