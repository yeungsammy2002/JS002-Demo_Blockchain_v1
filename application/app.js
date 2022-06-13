const express = require("express");

const TxPool = require("../transaction/tx-pool");
const Wallet = require("../transaction/wallet");
const Miner = require("../blockchain/miner");
const Block = require("../blockchain/block");

const { HTTP_PORT } = require("../config");

const app = express();

app.use(express.json());

const txPool = new TxPool();
const wallet = new Wallet();
const miner = new Miner(txPool, wallet);

app.get("/transactions", (req, res) => {
  res.json(txPool.pool);
});

app.post("/transact", (req, res) => {
  wallet.createTx(req.body.recip, req.body.amount, txPool);
  res.redirect("/transactions");
});

app.get("/mine", (req, res) => {
  const genesisBlock = Block.newGenesis();
  wallet.createTx("recipient123456", 888, txPool);
  res.json(miner.mine("miner123456", genesisBlock));
});

app.listen(HTTP_PORT, () => {
  console.log(`Server listening on port ${HTTP_PORT}...`);
});
