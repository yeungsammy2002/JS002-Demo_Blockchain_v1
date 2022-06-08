class TxPool {
  constructor() {
    this.pool = [];
  }

  addTx(tx) {
    this.pool.push(tx);
  }
}

module.exports = TxPool;
