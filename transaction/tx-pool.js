const Tx = require("./tx");

class TxPool {
  constructor() {
    this.pool = [];
  }

  addTx(senderW, recip, amount) {
    const idx = this.pool.findIndex((t) => t.input.address === senderW.pubKey);
    if (idx < 0) {
      if (senderW.bal < amount) {
        // checking required to avoid push "null" into pool
        console.log("Insufficient balance.");
        return;
      }
      this.pool.push(Tx.newTx(senderW, recip, amount));
    } else {
      this.pool[idx].update(senderW, recip, amount);
      // .update() is defined in "Tx" module
    }
  }
}

module.exports = TxPool;
