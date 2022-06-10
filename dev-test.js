const Wallet = require("./transaction/wallet");
const Tx = require("./transaction/tx");
const TxPool = require("./transaction/tx-pool");

const wallet = new Wallet();
// console.log(wallet.toString());

// const tx = Tx.newTx(wallet, "recipient123456", 77);
// console.log(tx);

const txPool = new TxPool();
// tp.addTx(tx);

wallet.createTx("recipient888888", 88, txPool);
wallet.createTx("recipient888888", 66, txPool);

console.log(txPool.pool);
