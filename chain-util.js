const EC = require("elliptic").ec;
const SHA256 = require("crypto-js/sha256");
const { v1: uuidv1 } = require("uuid");

const ec = new EC("secp256k1");

class ChainUtil {
  static genTxid() {
    return uuidv1();
  }

  static genKeyPair() {
    return ec.genKeyPair();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

module.exports = ChainUtil;
