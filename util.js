const uuid = require("uuid");
const EC = require("elliptic").ec;
const SHA256 = require("crypto-js/sha256");

const ec = new EC("secp256k1");

class Util {
  static genTxid() {
    return uuid.v1();
  }
  static genKeyPair() {
    return ec.genKeyPair();
  }
  static verifySgn(pubKey, dataHash, sgn) {
    return ec.keyFromPublic(pubKey, "hex").verify(dataHash, sgn);
  }
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

module.exports = Util;
