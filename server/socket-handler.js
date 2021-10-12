import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const server = app.listen(process.env.PORT || 8080);

export const wss = new WebSocketServer({ server });
// this will make Express serve your static files
app.use(express.static("./build-client"));
app.get("/", function(req, res) {
  res.sendFile("./build-client/index.html");
});

wss.getUniqueID = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

wss.on("connection", function connection(ws) {
  ws.id = wss.getUniqueID();
  ws.on("close", function close() {
    handleDisconnect(ws);
  });

  ws.on("message", function incoming(message) {
    try {
      message = JSON.parse(message);
    } catch (error) {
      console.log(error);
      return;
    }

    console.log(`Received message ${JSON.stringify(message)}`);
    switch (message.type) {
      case "Join":
        handleJoin(message.playerName, ws);
        break;
      case "Submit":
        handleSubmit(message, ws);
        break;
      default:
        break;
    }
  });
});

let handleDisconnect;
let handleSubmit;
let handleJoin;

export function registerOnDisconnect(cb) {
  handleDisconnect = cb;
}

export function registerOnSubmit(cb) {
  handleSubmit = cb;
}

export function registerOnJoin(cb) {
  handleJoin = cb;
}

export function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
