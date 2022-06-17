const INIT_BAL = 8888;
const MINING_REWARD = 88;
const DIFFICULTY = 4;
const BLOCK_TIME = 5000;
const BLOCK_TIME_TOL = 1000;
const P2P_PORT = process.env.P2P_PORT || 5001;
const PEERS = process.env.PEERS;

module.exports = {
  INIT_BAL,
  MINING_REWARD,
  DIFFICULTY,
  BLOCK_TIME,
  BLOCK_TIME_TOL,
  P2P_PORT,
  PEERS,
};
