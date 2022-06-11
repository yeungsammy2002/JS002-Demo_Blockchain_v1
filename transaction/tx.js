const Util = require("../util");
const { MINING_REWARD } = require("../config");

class Tx {
  constructor() {
    this.txid = null;
    this.input = null;
    this.outputs = [];
  }

  update(wallet, recip, amount) {
    const senderIdx = this.outputs.findIndex(
      (o) => o.address === this.input.address
    );
    if (this.outputs[senderIdx].amount < amount) {
      console.log("Insufficient balance.");
      return;
    }
    this.outputs[senderIdx].amount -= amount;
    this.outputs.push({ address: recip, amount });
    this.input = Tx.newInput(wallet, this.outputs);

    return this;
  }

  static newInput(wallet, outputs) {
    return {
      timestamp: Date.now(),
      address: wallet.pubKey,
      amount: wallet.bal,
      sgn: wallet.keyPair.sign(Util.hash(outputs)),
    };
  }

  static newTx(wallet, recip, amount) {
    const tx = new this();

    tx.txid = Util.genTxid();
    // generate TXID

    if (wallet.bal < amount) {
      console.log("Insufficient balance.");
      return;
    }
    tx.outputs = [
      // create outputs
      { address: wallet.pubKey, amount: wallet.bal - amount },
      { address: recip, amount },
    ];

    tx.input = Tx.newInput(wallet, tx.outputs);
    // create input and sign transaction

    return tx;
  }

  static isValidTx(tx) {
    const outputTotal = tx.outputs.reduce((accum, o) => accum + o.amount, 0);
    const isValidInOut = tx.input.amount === outputTotal ? true : false;
    if (!isValidInOut)
      console.log(`Invalid transaction from ${tx.input.address}`);

    const isValidSgn = Util.verifySgn(
      tx.input.address,
      Util.hash(tx.outputs),
      tx.input.sgn
    );
    if (!isValidSgn) console.log(`Invalid signature from ${tx.input.address}`);

    if (isValidInOut && isValidSgn) return true;
    else return false;
  }

  static miningRewardTx(wallet) {
    const tx = new this();
    tx.txid = Util.genTxid();
    tx.input = {
      timestamp: Date.now(),
      address: "mining-reward",
      amount: MINING_REWARD,
      sgn: "-",
    };
    tx.outputs = [{ address: wallet.pubKey, amount: MINING_REWARD }];
    return tx;
  }
}

module.exports = Tx;
