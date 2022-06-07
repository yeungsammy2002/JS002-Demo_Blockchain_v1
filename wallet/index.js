const ChainUtil = require("../chain-util");
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
}

module.exports = Wallet;
