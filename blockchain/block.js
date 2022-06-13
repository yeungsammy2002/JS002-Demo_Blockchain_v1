const { DIFFICULTY } = require("../config");

const Util = require("../util");

class Block {
  constructor(timestamp, lastHash, difficulty, nonce, txs, hash) {
    this.timestampe = timestamp;
    this.lastHash = lastHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.txs = txs;
    this.hash = hash;
  }
  static newGenesis() {
    const timestamp = Date.now();
    const lastHash = "genesis-block";
    const difficulty = DIFFICULTY;
    const nonce = 0;
    const txs = [];
    const hash = Util.hash(
      `${timestamp}${lastHash}${difficulty}${nonce}${txs}`
    );
    return new this(timestamp, lastHash, difficulty, nonce, txs, hash);
  }
  static genBlock(miner, lastBlock) {
    const { timestamp, lastHash, difficulty, nonce, txs, hash } =
      miner.mine(lastBlock);
    return new this(timestamp, lastHash, difficulty, nonce, txs, hash);
  }
}

module.exports = Block;
