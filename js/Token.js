class Token {
  constructor(index, owner) {
    this.owner = owner;
    this.id = `token-${index}-${this.owner.id}`;
    this.dropped = false;
  }

  drawHTMLToken() {
    const tokenDiv = document.createElement('div');
    const gameBoardUnderlay = document.querySelector('#game-board-underlay');
    gameBoardUnderlay.appendChild(tokenDiv);

    tokenDiv.setAttribute('id', this.id);
    tokenDiv.setAttribute('class', 'token');
    tokenDiv.style.backgroundColor = this.owner.color;
  }
}
