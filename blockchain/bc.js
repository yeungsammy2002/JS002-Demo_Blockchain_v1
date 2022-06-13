const Block = require("./block");

class Bc {
  constructor() {
    this.chain = [Block.newGenesis()];
  }
  addBlock(block) {
    this.chain.push(block);
  }
}

module.exports = Bc;
