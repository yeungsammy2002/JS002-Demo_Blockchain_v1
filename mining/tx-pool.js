const Tx = require("../transaction/tx");

class TxPool {
  constructor() {
    this.pool = [];
  }
  addTx(recip, amount, wallet) {
    const idx = this.pool.findIndex((t) => t.input.address === wallet.pubKey);
    if (idx < 0) {
      if (wallet.bal < amount) {
        console.log("Insufficient balance.");
        return;
      }
      this.pool.push(Tx.newTx(recip, amount, wallet));
    } else this.pool[idx].update(recip, amount, wallet);
  }
  getValidTxs(miner) {
    const validTxs = this.pool.filter((t) => {
      if (Tx.isValidTx(t)) return t;
      return;
    });
    return [Tx.genesis(miner), ...validTxs];
  }
}

module.exports = TxPool;
