const Wallet = require("./transaction/wallet");
const Tx = require("./transaction/tx");
const TxPool = require("./mining/tx-pool");
const Block = require("./blockchain/block");
const Bc = require("./blockchain/bc");
const Miner = require("./mining/miner");

const wallet = new Wallet();
const fakeWallet = new Wallet();
const txPool = new TxPool();

// Test new Wallet() and Tx.newTx()
// console.log(wallet);
// const tx = Tx.newTx("recipient888", 888, wallet);
// console.log(tx);

// Test wallet.createTx(), tx.update() and txPool.addTx()
//
// test valid transaction
// wallet.createTx("recipient777", 777, txPool);
// console.log(txPool.pool);
// console.log(txPool.pool[0].outputs[0]);
// console.log(txPool.pool[0].outputs[1]);
//
// test first tx with insufficient balance
// wallet.createTx("recipient9999", 9999, txPool);
//
// test tx.update()
// wallet.createTx("recipient666", 666, txPool);
// wallet.createTx("recipient555", 555, txPool);
// console.log(txPool.pool);
// console.log(txPool.pool[0]);
//
// test tx.update() with insufficient balance
// wallet.createTx("recipient6666", 6666, txPool);
// wallet.createTx("recipient1111", 1111, txPool);
// wallet.createTx("recipient5555", 5555, txPool);
// // console.log(txPool.pool);
// console.log(txPool.pool[0]);

// Test Tx.genesis()
// console.log(Tx.genesis("miner88"));

// Test Tx.isValidTx()
// const tx = Tx.newTx("recipient888", 888, wallet);
//
// test valid transaction
// console.log(tx);
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));
//
// test invalid input amount
// tx.input.amount = 1000000;
// // console.log(tx);
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));
//
// test invalid output amounts
// tx.outputs[0].amount = 100000;
// tx.outputs[1].amount = 100000;
// console.log(tx);
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));
//
// test tempered input and output amounts
// tx.input.amount = 200000;
// tx.outputs[0].amount = 100000;
// tx.outputs[1].amount = 100000;
// console.log(tx);
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));
//
// test valid signature
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));
//
// test invalid signature
// const fakeTx = Tx.newTx("recipient888", 888, fakeWallet);
// // console.log(fakeTx);
// tx.input.sgn = fakeTx.input.sgn;
// console.log(tx);
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));
//
// test tempered input and output amounts
// tx.input.amount = 200000;
// tx.outputs[0].amount = 100000;
// tx.outputs[1].amount = 100000;
// console.log(tx);
// Tx.isValidTx(tx);
// console.log(Tx.isValidTx(tx));

// Test getValidTxs()
// const wallet1 = new Wallet();
// const wallet2 = new Wallet();
// const wallet3 = new Wallet();
// const wallet4 = new Wallet();
// const wallet5 = new Wallet();
// const wallet6 = new Wallet();
// const wallet7 = new Wallet();
// const wallet8 = new Wallet();
// wallet1.createTx("recipient1111", 1111, txPool);
// wallet2.createTx("recipient2222", 2222, txPool);
// wallet3.createTx("recipient3333", 3333, txPool);
// wallet4.createTx("recipient4444", 4444, txPool);
// wallet5.createTx("recipient5555", 5555, txPool);
// wallet6.createTx("recipient6666", 6666, txPool);
// wallet7.createTx("recipient7777", 7777, txPool);
// wallet8.createTx("recipient8888", 8888, txPool);
// // update tx
// wallet.createTx("recipient1234", 1234, txPool);
// wallet.createTx("recipient2345", 2345, txPool);
// // temper wallet6 tx
// txPool.pool[5].input.amount = 1000000;
// txPool.pool[5].outputs[0].amount = 500000;
// txPool.pool[5].outputs[1].amount = 500000;
// // console.log(txPool.pool[5]);
// console.log(txPool.getValidTxs("miner88"));

// Test Block.genesis() and new Bc()
// console.log(Block.genesis());
// const bc = new Bc();
// console.log(bc);

// Test mineBlock()
// const bc = new Bc();
// for (let i = 0; i < 6; ++i) {
//   const block = Miner.mineBlock(bc.chain[i], txPool.getValidTxs("miner88"));
//   bc.addBlock(block);
// }
// console.log(bc.chain);

// Test isValidBlockHash()
// wallet.createTx("recipient888", 888, txPool);
// const block = Miner.mineBlock(Block.genesis(), txPool.getValidTxs("miner88"));
// console.log(block.txs[1].input.amount);
// console.log(block.txs[1].outputs[0].amount);
// console.log(block.txs[1].outputs[1].amount);
// console.log(block.txs[1]);
// console.log(block.txs[1]);
//
// test valid block with valid transaction
// block.txs[1].input.amount = 8888;
// block.txs[1].outputs[0].amount = 8000;
// block.txs[1].outputs[1].amount = 888;
// console.log(block.txs[1]);
// console.log(Block.isValidBlockHash(block));
//
// test invalid block with invalid transaction
// block.txs[1].input.amount = 3000000;
// block.txs[1].outputs[0].amount = 1000000;
// block.txs[1].outputs[1].amount = 2000000;
// console.log(block.txs[1]);
// console.log(Block.isValidBlockHash(block));

// Test isValidChain()
// const bc = new Bc();
// for (let i = 0; i < 6; ++i) {
//   wallet.createTx("recipient888", 888, txPool);
//   const block = Miner.mineBlock(bc.chain[i], txPool.getValidTxs("miner88"));
//   txPool.pool = [];
//   bc.addBlock(block);
// }
//
// test valid block
// console.log(bc.chain);
// console.log(Bc.isValidChain(bc.chain));
//
// test invalid block hash
// console.log(bc.chain[1].txs[1].input.amount);
// console.log(bc.chain[1].txs[1].outputs[0].amount);
// console.log(bc.chain[1].txs[1].outputs[1].amount);
// console.log(bc.chain[1].txs[1]);
// bc.chain[1].txs[1].input.amount = 3000000;
// bc.chain[1].txs[1].outputs[0].amount = 1000000;
// bc.chain[1].txs[1].outputs[1].amount = 2000000;
// console.log(bc.chain[1].txs[1]);
// console.log(Bc.isValidChain(bc.chain));

// Test bc.replaceChain()
const bc1 = new Bc();
const bc2 = new Bc();
const wallet1 = new Wallet();
const wallet2 = new Wallet();
//
// test longer incoming chain replace current chain
// for (let i = 0; i < 5; ++i) {
//   wallet1.createTx("recipient888", 888, txPool);
//   const block = Miner.mineBlock(bc1.chain[i], txPool.getValidTxs("miner88"));
//   bc1.addBlock(block);
//   txPool.pool = [];
// }
// console.log("bc1", bc1.chain);
// for (let i = 0; i < 6; ++i) {
//   wallet2.createTx("recipient999", 999, txPool);
//   const block = Miner.mineBlock(bc2.chain[i], txPool.getValidTxs("miner88"));
//   bc2.addBlock(block);
//   txPool.pool = [];
// }
// console.log("bc2", bc2.chain);
// bc1.replaceChain(bc2.chain);
// console.log("bc1", bc1);
//
// test equal-length incoming chain not replace current chain
// for (let i = 0; i < 5; ++i) {
//   wallet1.createTx("recipient888", 888, txPool);
//   const block = Miner.mineBlock(bc1.chain[i], txPool.getValidTxs("miner88"));
//   bc1.addBlock(block);
//   txPool.pool = [];
// }
// console.log("bc1", bc1.chain);
// for (let i = 0; i < 5; ++i) {
//   wallet2.createTx("recipient999", 999, txPool);
//   const block = Miner.mineBlock(bc2.chain[i], txPool.getValidTxs("miner88"));
//   bc2.addBlock(block);
//   txPool.pool = [];
// }
// console.log("bc2", bc2.chain);
// bc1.replaceChain(bc2.chain);
// console.log("bc1", bc1);
//
// test shorter incoming chain not replace current chain
// for (let i = 0; i < 6; ++i) {
//   wallet1.createTx("recipient888", 888, txPool);
//   const block = Miner.mineBlock(bc1.chain[i], txPool.getValidTxs("miner88"));
//   bc1.addBlock(block);
//   txPool.pool = [];
// }
// console.log("bc1", bc1.chain);
// for (let i = 0; i < 5; ++i) {
//   wallet2.createTx("recipient999", 999, txPool);
//   const block = Miner.mineBlock(bc2.chain[i], txPool.getValidTxs("miner88"));
//   bc2.addBlock(block);
//   txPool.pool = [];
// }
// console.log("bc2", bc2.chain);
// bc1.replaceChain(bc2.chain);
// console.log("bc1", bc1);
//
//test longer incoming chain but invalid
for (let i = 0; i < 5; ++i) {
  wallet1.createTx("recipient888", 888, txPool);
  const block = Miner.mineBlock(bc1.chain[i], txPool.getValidTxs("miner88"));
  bc1.addBlock(block);
  txPool.pool = [];
}
console.log("bc1", bc1.chain);
for (let i = 0; i < 6; ++i) {
  wallet2.createTx("recipient999", 999, txPool);
  const block = Miner.mineBlock(bc2.chain[i], txPool.getValidTxs("miner88"));
  bc2.addBlock(block);
  txPool.pool = [];
}
bc2.chain[1].txs[1].input.amount = 3000000;
bc2.chain[1].txs[1].outputs[0].amount = 1000000;
bc2.chain[1].txs[1].outputs[1].amount = 2000000;
console.log("bc2", bc2.chain);
bc1.replaceChain(bc2.chain);
console.log("bc1", bc1);
