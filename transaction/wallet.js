const Util = require("../util");

const { INIT_BAL } = require("../config");

class Wallet {
  constructor() {
    this.bal = INIT_BAL;
    this.wallet = Util.genKeyPair();
    this.pubKey = this.wallet.getPublic().encode("hex");
  }

  toString() {
    return `Wallet -
        Public Address: ${this.pubKey.toString()}
        Balance       : ${this.bal}`;
  }

  createTx(recip, amount, txPool) {
    txPool.addTx(this, recip, amount);
  }
}

module.exports = Wallet;