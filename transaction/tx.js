const Util = require("../util");

const { MINING_REWARD } = require("../config");

class Tx {
  constructor() {
    this.txid = null;
    this.input = null;
    this.outputs = [];
  }
  update(recip, amount, wallet) {
    const senderIdx = this.outputs.findIndex(
      (o) => o.address === wallet.pubKey
    );
    if (this.outputs[senderIdx].amount < amount) {
      console.log("Insufficient balance.");
      return;
    }
    this.outputs[senderIdx].amount -= amount;
    this.outputs.push({ address: recip, amount });
    this.input = wallet.keyPair.sign(Util.hash(this.outputs)).toDER("hex");
    return this;
  }
  static newInput(outputs, wallet) {
    return {
      timestamp: Date.now(),
      address: wallet.pubKey,
      amount: wallet.bal,
      sgn: wallet.keyPair.sign(Util.hash(outputs)).toDER("hex"),
    };
  }
  static newTx(recip, amount, wallet) {
    if (wallet.bal < amount) {
      console.log("Insufficient balance.");
      return;
    }
    const tx = new this();
    tx.txid = Util.genTxid();
    tx.outputs = [
      { address: wallet.pubKey, amount: wallet.bal - amount },
      { address: recip, amount },
    ];
    tx.input = Tx.newInput(tx.outputs, wallet);
    return tx;
  }
  static genesisTx(recip) {
    const tx = new this();
    tx.txid = Util.genTxid();
    tx.input = {
      timestamp: Date.now(),
      address: "genesis-transaction",
      amount: MINING_REWARD,
      sgn: "-",
    };
    tx.outputs = [{ address: recip, amount: MINING_REWARD }];
    return tx;
  }
  static isValidTx(tx) {
    const outputTotal = tx.outputs.reduce((accum, o) => accum + o.amount, 0);
    const isValidAmount = outputTotal === tx.input.amount ? true : false;
    if (!isValidAmount)
      console.log(
        `Invalid transaction, input amount does not match output amounts. Sender address: ${tx.input.address}`
      );

    const isValidSgn = Util.verifySgn(
      tx.input.address,
      Util.hash(tx.outputs),
      tx.input.sgn
    );
    if (!isValidSgn)
      console.log(
        `Invalid transaction, invalid Signature. Sender address: ${tx.input.address}`
      );
    if (isValidAmount && isValidSgn) return true;
    else return false;
  }
}

module.exports = Tx;
