const Wallet = require("./wallet");
const Tx = require("./wallet/tx");
const TxPool = require("./wallet/tx-pool");

const wallet = new Wallet();
// console.log(wallet.toString());

const tx = Tx.newTx(wallet, "recipient123456", 77);
// console.log(tx);

const tp = new TxPool();
tp.addTx(tx);
console.log(tp);
