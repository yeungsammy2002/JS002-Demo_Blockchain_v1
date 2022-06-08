class TxPool {
  constructor() {
    this.pool = [];
  }

  addTx(tx) {
    const idx = this.pool.findIndex((t) => t.txid === tx.txid);
    if (idx > -1) this.pool[idx] = tx;
    else this.pool.push(tx);
  }

  getExistingTx(address) {
    return this.pool.find((t) => t.input.address === address);
  }
}

module.exports = TxPool;
