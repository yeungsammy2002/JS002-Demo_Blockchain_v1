const Websocket = require("ws");

const { P2P_PORT, PEERS } = require("../config");

class P2pNode {
  constructor(bc) {
    this.bc = bc;
    this.sockets = [];
  }
  listen() {
    const node = new Websocket.Server({ port: P2P_PORT });
    node.on("connection", (socket) => {
      this.connectSocket(socket);
    });
    this.connectToPeers();
    console.log(`Peer-To-Peer node listening on port ${P2P_PORT}...`);
  }
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("New socket connected.");
    this.messageHandler(socket);
    socket.send(JSON.stringify(this.bc.chain));
  }
  connectToPeers() {
    const peers = PEERS ? PEERS.split(",") : [];
    peers.forEach((p) => {
      const socket = new Websocket(p);
      socket.on("open", () => this.connectSocket(socket));
    });
  }
  messageHandler(socket) {
    socket.on("message", (m) => {
      const data = JSON.parse(m);
      console.log(data);
      this.bc.replaceChain(data);
    });
  }
}

module.exports = P2pNode;
