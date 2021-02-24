class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createToken(21);
  }

  /**
   * Creates token objects for player
   * @param   {integer}   number - Number of token objects to be created
   * @return  {array}     tokens - an array of new token objects
   */
  createToken(number) {
    const tokens = [];

    for (let i = 0; i < number; i++) {
      let token = new Token(i, this);
      tokens.push(token);
    }

    return tokens;
  }
}
