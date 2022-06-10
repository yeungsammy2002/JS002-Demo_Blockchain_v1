const Wallet = require("./transaction/wallet");
const Tx = require("./transaction/tx");
const TxPool = require("./transaction/tx-pool");
const Util = require("./util");

const wallet = new Wallet();
// console.log(wallet.toString());

const tx = Tx.newTx(wallet, "recipient123456", 77);
const fakeTx = Tx.newTx(wallet, "recipient123456", 99);
// console.log(fakeTx.outputs);
// const fakeSgn = wallet.wallet.sign(Util.hash(fakeTx.outputs));
// console.log(fakeSgn);
// console.log(tx.input.sgn);
// tx.input.amount = 900;
// tx.outputs[1].amount = 100;
// tx.input.sgn = fakeSgn;
// console.log(tx);

// console.log(Tx.verifyTx(tx));

const txPool = new TxPool();
// tp.addTx(tx);

wallet.createTx("recipient888888", 88, txPool);
// Tx.verifyTx(txPool.pool[0]);
// wallet.createTx("recipient888888", 66, txPool);

// console.log(txPool.pool);

// const VALID_OUT = 800;
// txPool.pool[0].outputs[0].amount = VALID_OUT;

// const INVALID_OUT = 801
// txPool.pool[0].outputs[0].amount = INVALID_OUT;

// const VALID_SGN = wallet.wallet.sign(Util.hash(txPool.pool[0].outputs));
// txPool.pool[0].input.sgn = VALID_SGN

// const INVALID_SGN = wallet.wallet.sign(Util.hash(fakeTx.outputs));
// txPool.pool[0].input.sgn = INVALID_SGN;

// console.log(txPool.pool[0].input.sgn);

// console.log(Tx.verifyTx(txPool.pool[0]));
// console.log();

const validTxs = txPool.getValidTxs();

// console.log(validTxs);

// console.log(Tx.verifyTx(tx));
