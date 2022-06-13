const Util = require("../util");

const { BLOCK_TIME } = require("../config");

class Miner {
  constructor(txPool, recip) {
    this.txPool = txPool;
    this.recip = recip;
  }
  mine(lastBlock) {
    let timestamp = 0;
    const lastHash = lastBlock.hash;
    let difficulty = 0;
    let nonce = 0;
    const txs = this.txPool.getValidTxs(this.recip);
    let hash = "";

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Miner.adjustDiff(lastBlock, timestamp);
      hash = Util.hash(`${timestamp}${lastHash}${difficulty}${nonce}${txs}`);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    console.log(difficulty);
    console.log(timestamp - lastBlock.timestamp);
    return { timestamp, lastHash, difficulty, nonce, txs, hash };
  }
  static adjustDiff(lastBlock, timestamp) {
    let difficulty = lastBlock.difficulty;
    const block_time = timestamp - lastBlock.timestamp;
    if (block_time < BLOCK_TIME - 1000) difficulty = lastBlock.difficulty + 1;
    if (block_time > BLOCK_TIME + 1000) difficulty = lastBlock.difficulty - 1;
    return difficulty;
  }
}

module.exports = Miner;
