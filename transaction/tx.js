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
      (o) => o.address === this.input.address
    );
    if (this.outputs[senderIdx].amount < amount) {
      console.log("Insufficient balance.");
      return;
    }
    this.outputs[senderIdx].amount -= amount;
    this.outputs.push({ address: recip, amount });
    this.input = Tx.newInput(this.outputs, wallet);
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
  static genesis(miner) {
    const tx = new Tx();
    tx.txid = Util.genTxid();
    tx.outputs = [{ address: miner, amount: MINING_REWARD }];
    tx.input = {
      timestamp: Date.now(),
      address: "genesis-transaction",
      amount: MINING_REWARD,
      sgn: "-",
    };
    return tx;
  }
  static isValidTx(tx) {
    const outputTotal = tx.outputs.reduce((accum, o) => accum + o.amount, 0);
    const isValidAmounts = outputTotal === tx.input.amount ? true : false;
    if (!isValidAmounts) {
      console.log(
        `Invalid transaction, amount(s) invalid. Sender address ${tx.input.address}`
      );
    }
    const isValidSgn = Util.verifySgn(
      tx.input.address,
      Util.hash(tx.outputs),
      tx.input.sgn
    );
    if (!isValidSgn) {
      console.log(
        `Invalid transaction, signature invalid. Sender address ${tx.input.address}`
      );
    }
    if (isValidAmounts && isValidSgn) return true;
    else return false;
  }
}

module.exports = Tx;
