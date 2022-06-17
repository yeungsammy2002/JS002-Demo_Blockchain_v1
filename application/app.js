const P2pNode = require("./p2p-node.js");
const Bc = require("../blockchain/bc");
const Wallet = require("../transaction/wallet");
const Miner = require("../mining/miner");
const TxPool = require("../mining/tx-pool");

const wallet = new Wallet();
const bc = new Bc();
const p2pNode = new P2pNode(bc);
const txPool = new TxPool();

for (let i = 0; i < 5; ++i) {
  wallet.createTx("recipient888", 888, txPool);
  const block = Miner.mineBlock(bc.chain[i], txPool.getValidTxs("miner88"));
  bc.addBlock(block);
  txPool.pool = [];
}

p2pNode.listen();
