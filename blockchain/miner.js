const Tx = require("../transaction/tx");

class Miner {
  constructor(txPool, wallet) {
    this.wallet = wallet;
    this.txPool = txPool;
  }

  mine() {
    const validTxs = [];
    validTxs.push(Tx.miningRewardTx(this.wallet));
    validTxs.push(this.txPool.getValidTxs());
    console.log(validTxs);
    return validTxs;
  }
}

module.exports = Miner;
