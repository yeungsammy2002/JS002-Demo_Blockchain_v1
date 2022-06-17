const { isValidBlockHash } = require("./block");
const Block = require("./block");

class Bc {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock(block) {
    this.chain.push(block);
  }
  replaceChain(chain) {
    if (this.chain.length >= chain.length) {
      console.log(
        "Received a new chain, but the new chain is not longer than the current chain."
      );
      return;
    }
    if (!Bc.isValidChain(chain)) {
      return;
    }
    console.log(
      "Received a new valid longer chain, replacing the current chain with the new chain."
    );
    this.chain = chain;
  }
  static isValidChain(chain) {
    const incomingGenesis = JSON.stringify(chain[0]);
    const localGenesis = JSON.stringify(Block.genesis());
    if (incomingGenesis !== localGenesis) {
      console.log("Received a new chain, but invalid genesis block.");
      return;
    }
    for (let i = 1; i < chain.length; ++i) {
      const block = chain[i];
      const preBlock = chain[i - 1];
      if (block.lastHash !== preBlock.hash) {
        console.log(
          "Received a new chain, but last hash doesn't previous block hash."
        );
        return false;
      }
      if (!isValidBlockHash(block)) {
        console.log("Received a new chain, but invalid block hash.");
        return false;
      }
    }
    return true;
  }
}

module.exports = Bc;
