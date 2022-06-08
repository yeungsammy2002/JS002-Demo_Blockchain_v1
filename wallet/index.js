const ChainUtil = require("../chain-util");

const Tx = require("./tx");

const { INIT_BAL } = require("../config");

class Wallet {
  constructor() {
    this.bal = INIT_BAL;
    this.wallet = ChainUtil.genKeyPair();
    this.pubKey = this.wallet.getPublic().encode("hex");
  }

  toString() {
    return `Wallet -
        Public Address: ${this.pubKey.toString()}
        Balance       : ${this.bal}`;
  }

  createTx(recip, amount, txPool) {
    if (this.bal < amount) {
      console.log("Insufficient balance.");
      return;
    }

    const tx = Tx.newTx(this, recip, amount);
    txPool.addTx(tx);
  }
}

module.exports = Wallet;
