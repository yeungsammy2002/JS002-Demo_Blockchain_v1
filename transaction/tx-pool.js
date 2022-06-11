const Tx = require("./tx");

class TxPool {
  constructor() {
    this.pool = [];
  }

  addTx(wallet, recip, amount) {
    const idx = this.pool.findIndex((t) => t.input.address === wallet.pubKey);
    if (idx < 0) {
      if (wallet.bal < amount) {
        // checking required to avoid push "null" into pool
        console.log("Insufficient balance.");
        return;
      }
      this.pool.push(Tx.newTx(wallet, recip, amount));
    } else {
      this.pool[idx].update(wallet, recip, amount);
      // .update() is defined in "Tx" module
    }
  }

  getValidTxs() {
    return this.pool.filter((t) => {
      if (Tx.isValidTx(t)) return t;
      return;
    });
  }
}

module.exports = TxPool;
