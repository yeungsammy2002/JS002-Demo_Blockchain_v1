const Util = require("../util");

class Tx {
  constructor() {
    this.txid = null;
    this.input = null;
    this.outputs = [];
  }

  static newInput(senderW, outputs) {
    return {
      timestamp: Date.now(),
      address: senderW.pubKey,
      amount: senderW.bal,
      signature: senderW.wallet.sign(Util.hash(outputs)),
    };
  }

  static newTx(senderW, recip, amount) {
    const tx = new this();

    tx.txid = Util.genTxid();
    // generate TXID

    if (senderW.bal < amount) {
      console.log("Insufficient balance.");
      return;
    }
    tx.outputs = [
      // create outputs
      { address: senderW.pubKey, amount: senderW.bal - amount },
      { address: recip, amount },
    ];

    tx.input = Tx.newInput(senderW, tx.outputs);
    // create input and sign transaction

    return tx;
  }

  update(senderW, recip, amount) {
    const senderIdx = this.outputs.findIndex(
      (o) => o.address === this.input.address
    );
    if (this.outputs[senderIdx].amount < amount) {
      console.log("Insufficient balance.");
      return;
    }
    this.outputs[senderIdx].amount -= amount;
    this.outputs.push({ address: recip, amount });
    this.input = Tx.newInput(senderW, this.outputs);

    return this;
  }
}

module.exports = Tx;
