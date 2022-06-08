const ChainUtil = require("../chain-util");

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
      signature: senderW.wallet.sign(ChainUtil.hash(outputs)),
    };
  }

  static newTx(senderW, recip, amount) {
    const tx = new this();

    // generate TXID
    tx.txid = ChainUtil.genTxid();

    // create outputs
    if (senderW.bal < amount) {
      console.log("Insuffient balance.");
      return;
    }
    tx.outputs = [
      { address: senderW.pubKey, amount: senderW.bal - amount },
      { address: recip, amount },
    ];

    // create input and sign transaction
    tx.input = Tx.newInput(senderW, tx.outputs);

    return tx;
  }

  updateTx(senderW, recip, amount) {
    const senderIdx = this.outputs.findIndex(
      (o) => o.address === this.input.address
    );
    if (this.outputs[senderIdx].amount < amount) {
      console.log("Insuffient balance.");
      return;
    }
    this.outputs[senderIdx].amount -= amount;
    this.outputs.push({ address: recip, amount });
    this.input = Tx.newInput(senderW, this.outputs);

    return this;
  }
}

module.exports = Tx;
