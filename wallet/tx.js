const ChainUtil = require("../chain-util");

class Tx {
  constructor() {
    this.txid = null;
    this.input = null;
    this.outputs = [];
  }

  static newTx(senderW, recip, amount) {
    const tx = new this();

    // generate TXID
    tx.txid = ChainUtil.gen_txid();

    // create outputs
    if (senderW.bal < amount) {
      console.log("Insuffient balance.");
      return;
    }
    tx.outputs = [
      { address: recip, amount },
      { address: senderW.pubKey, amount: senderW.bal - amount },
    ];

    // create input and sign transaction
    tx.input = {
      timestamp: Date.now(),
      address: senderW.pubKey,
      amount: senderW.bal,
      signature: senderW.wallet.sign(ChainUtil.hash(tx.outputs)),
    };

    return tx;
  }
}

module.exports = Tx;
