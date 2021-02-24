class Player {
  constructor(name, color, id, active = false) {
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

  /**
   * Gets all tokens that haven't been dropped.
   * @return {array} Array of unused tokens.
   */
  get unusedTokens() {
    return this.tokens.filter(token => token.dropped === false); //'===' used for better readability
  }

  /**
   * Gets the active token by returning the first token in the array of unused tokens.
   * @return {Object} First token object in the array of unused tokens.
   */
  get activeToken() {
    return this.unusedTokens[0];
  }
}
