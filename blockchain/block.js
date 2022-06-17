const Util = require("../util");

const { DIFFICULTY } = require("../config");

class Block {
  constructor(timestamp, lastHash, difficulty, nonce, txs, hash) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.txs = txs;
    this.hash = hash;
  }
  static genesis() {
    const timestamp = 0;
    const lastHash = "genesis-block";
    const difficulty = DIFFICULTY;
    const nonce = 0;
    const txs = [];
    const txsStr = JSON.stringify(txs);
    const hash = Util.hash(
      `${timestamp}${lastHash}${difficulty}${nonce}${txsStr}`
    );
    return new this(timestamp, lastHash, difficulty, nonce, txs, hash);
  }
  static isValidBlockHash(block) {
    const { timestamp, lastHash, difficulty, nonce, txs, hash } = block;
    const txsStr = JSON.stringify(txs);
    const genuineHash = Util.hash(
      `${timestamp}${lastHash}${difficulty}${nonce}${txsStr}`
    );
    if (genuineHash === hash) return true;
    return false;
  }
}

module.exports = Block;
