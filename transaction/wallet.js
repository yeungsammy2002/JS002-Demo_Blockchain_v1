const Util = require("../util");

const { INIT_BAL } = require("../config");

class Wallet {
  constructor() {
    this.bal = INIT_BAL;
    this.keyPair = Util.genKeyPair();
    this.pubKey = this.keyPair.getPublic().encode("hex");
  }
  createTx(recip, amount, txPool) {
    txPool.addTx(recip, amount, this);
  }
}

module.exports = Wallet;
