const express = require("express");

const TxPool = require("../wallet/tx-pool");
const Wallet = require("../wallet");

const { HTTP_PORT } = require("../config");
const { redirect } = require("express/lib/response");

const app = express();

app.use(express.json());

const txPool = new TxPool();
const wallet = new Wallet();

app.get("/transactions", (req, res) => {
  return res.json(txPool.pool);
});

app.post("/transact", (req, res) => {
  // console.log(req.body.recip, req.body.amount);
  wallet.createTx(req.body.recip, req.body.amount, txPool);
  res.redirect("/transactions");
});

app.listen(HTTP_PORT, () => {
  console.log(`Server listening on Port: ${HTTP_PORT}`);
});
