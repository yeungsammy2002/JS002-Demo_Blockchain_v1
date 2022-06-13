// Test new Wallet() and Tx - newTx()
// const Wallet = require("./transaction/wallet");
// const wallet = new Wallet();
// const Tx = require("./transaction/tx");
// const tx = Tx.newTx("recipient123456", 888, wallet);
// console.log(tx);
// console.log(wallet);

// Test Wallet - createTx() and TxPool - addTx()
// const Wallet = require("./transaction/wallet");
// const wallet = new Wallet();
// const TxPool = require("./transaction/tx-pool");
// const txPool = new TxPool();
//
// test Tx - addTx()
// wallet.createTx("recipient888", 888, txPool);
// console.log(txPool.pool);
//
// test Tx - update()
// wallet.createTx("recipient888", 888, txPool);
// wallet.createTx("recipient123", 123, txPool);
// console.log(txPool.pool);
//
// test in Port 3001

// Test Tx - isValidTx()
// const Wallet = require("./transaction/wallet");
// const wallet = new Wallet();
// const Tx = require("./transaction/tx");
// const tx = Tx.newTx("recipient1234", 1234, wallet);
//
// test isValidAmount
// Tx.isValidTx(tx);
//
// test invalid input
// console.log(tx.input.amount);
// tx.input.amount = 3000000;
// Tx.isValidTx(tx);
//
// test invalid ouput
// console.log(tx.outputs[0].amount);
// tx.outputs[0].amount = 2000000;
// tx.outputs[1].amount = 1000000;
// Tx.isValidTx(tx);
//
// temper both input and outputs amount
// tx.input.amount = 3000000;
// tx.outputs[0].amount = 2000000;
// tx.outputs[1].amount = 1000000;
// Tx.isValidTx(tx);
//
// test isValidSgn
// Tx.isValidTx(tx);
//
// test invalid signature
// const fakeWallet = new Wallet();
// const fakeTx = Tx.newTx("recipient1234", 1234, fakeWallet);
// // console.log(fakeTx.input.sgn);
// tx.input.sgn = fakeTx.input.sgn;
// Tx.isValidTx(tx);
//
// test tempered input and output amounts
// tx.input.amount = 3000000;
// tx.outputs[0].amount = 2000000;
// tx.outputs[1].amount = 1000000;
// Tx.isValidTx(tx);
//
// test return value of isValidTx()
// console.log(Tx.isValidTx(tx));

// Test TxPool - getValidTxs()
// const Wallet = require("./transaction/wallet");
// const TxPool = require("./transaction/tx-pool");
// const wallet = new Wallet();
// const wallet2 = new Wallet();
// const txPool = new TxPool();
// wallet.createTx("recipient888", 888, txPool);
// wallet2.createTx("recipient2222", 2222, txPool);
//
// test valid transactions
// console.log(txPool.getValidTxs());
//
// test invalid transaction - temper input amount
// txPool.pool[0].input.amount = 3000000;
// txPool.pool[1].input.amount = 3000000;
// console.log(txPool.getValidTxs());
//
// test invalid transaction - temper output amount
// txPool.pool[1].outputs[0].amount = 3000000;
// console.log(txPool.getValidTxs());
//
// test invalid transaction - temper input and output amounts
// txPool.pool[0].input.amount = 3000000;
// txPool.pool[0].outputs[0].amount = 2000000;
// txPool.pool[0].outputs[1].amount = 1000000;
// console.log(txPool.getValidTxs());
//
// test invalid transaction - temper signature
// const Tx = require("./transaction/tx");
// const fakeWallet = new Wallet();
// const fakeTx = Tx.newTx("recipient2222", 8888, fakeWallet);
// txPool.pool[1].input.sgn = fakeTx.input.sgn;
// // console.log(txPool.pool[1]);
// console.log(txPool.getValidTxs());

// Test Block - newGenesis()
// const Block = require("./blockchain/block");
// const genesisBlock = Block.newGenesis();
// console.log(genesisBlock);

// Test Miner - mine()
const Wallet = require("./transaction/wallet");
const wallet = new Wallet();
const TxPool = require("./transaction/tx-pool");
const txPool = new TxPool();
const Block = require("./blockchain/block");
const genesisBlock = Block.newGenesis();
const Miner = require("./blockchain/miner");
const miner = new Miner(txPool, wallet);
const package = miner.mine("miner123456", genesisBlock);
console.log(package);
