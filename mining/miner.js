const Util = require("../util");

const Block = require("../blockchain/block");

const { BLOCK_TIME, BLOCK_TIME_TOL } = require("../config");

class Miner {
  static mineBlock(lastBlock, txs) {
    const {
      hash: lastHash,
      difficulty: lastDiff,
      timestamp: lastTs,
    } = lastBlock;

    let timestamp = 0;
    let difficulty = 0;
    let nonce = 0;
    let hash = "";
    const txsStr = JSON.stringify(txs);
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Miner.adjustDiff(timestamp, lastDiff, lastTs);
      hash = Util.hash(`${timestamp}${lastHash}${difficulty}${nonce}${txsStr}`);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    return new Block(timestamp, lastHash, difficulty, nonce, txs, hash);
  }
  static adjustDiff(timestamp, lastDiff, lastTs) {
    let difficulty = lastDiff;
    const blockTime = timestamp - lastTs;
    if (blockTime < BLOCK_TIME - BLOCK_TIME_TOL) difficulty = lastDiff + 1;
    if (blockTime > BLOCK_TIME + BLOCK_TIME_TOL) difficulty = lastDiff - 1;
    return Math.abs(difficulty);
  }
}

module.exports = Miner;
