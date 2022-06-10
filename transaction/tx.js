const Util = require("../util");

class Tx {
  constructor() {
    this.txid = null;
    this.input = null;
    this.outputs = [];
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

  static newInput(senderW, outputs) {
    return {
      timestamp: Date.now(),
      address: senderW.pubKey,
      amount: senderW.bal,
      sgn: senderW.wallet.sign(Util.hash(outputs)),
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

  static verifyTx(tx) {
    const outputTotal = tx.outputs.reduce((accum, o) => accum + o.amount, 0);
    const isValidInOut = tx.input.amount === outputTotal ? true : false;

    const isValidSgn = Util.verifySgn(
      tx.input.address,
      Util.hash(tx.outputs),
      tx.input.sgn
    );

    if (!isValidInOut)
      console.log(`Invalid transaction from ${tx.input.address}`);
    if (!isValidSgn) console.log(`Invalid signature from ${tx.input.address}`);

    if (isValidInOut && isValidSgn) return true;
    else return false;
  }
}

module.exports = Tx;
