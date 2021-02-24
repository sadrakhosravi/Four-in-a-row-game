class Token {
  constructor(index, owner) {
    this.owner = owner;
    this.id = `token-${index}-${this.owner.id}`;
    this.dropped = false;
  }
}
