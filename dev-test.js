const Wallet = require("./wallet");
const Tx = require("./wallet/tx");

const wallet = new Wallet();

// console.log(wallet.toString());
const tx = Tx.newTx(wallet, "recipient123456", 77);

console.log(tx);
