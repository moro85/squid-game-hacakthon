import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const questionTimeout = 60000;
const maxPlayerCount = 1;
const questions = [
  {
    description: "",
    validators: [() => {}]
  }
];
const gameState = {
  clients: [],
  currentQuestion: 0,
  state: "NotStarted"
};

wss.getUniqueID = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

function validateSubmissions(client) {
  if (
    client.submissions[gameState.currentQuestion] &&
    client.submissions[gameState.currentQuestion].code
  ) {
    return questions[currentQuestion].validators.every(validator =>
      validator(client.submissions[gameState.currentQuestion].code)
    );
  }
  return false;
}

wss.on("connection", function connection(ws) {
  ws.id = wss.getUniqueID();
  ws.on("message", function incoming(message) {
    message = JSON.parse(message);
    console.log(`Received message ${JSON.stringify(message)}`);
    switch (message.type) {
      case "Join":
        if (gameState.state !== "NotStarted") {
          ws.send(
            JSON.stringify({ type: "Status", state: "GameAlreadyStarted" })
          );
        }
        if (
          gameState.clients.some(
            c =>
              c.playerName.toLocaleLowerCase() ===
                message.playerName.toLocaleLowerCase() || c.id === ws.id
          )
        ) {
          ws.send(
            JSON.stringify({ type: "Status", state: "PlayerAlreadyJoined" })
          );
        } else {
          gameState.clients.push({
            playerName: message.playerName,
            submissions: [],
            status: "Playing",
            id: ws.id
          });
          if (gameState.clients.length === maxPlayerCount) {
            wss.clients.forEach(function each(client) {
              if (client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "Question",
                    qNum: gameState.currentQuestion + 1,
                    totalQ: questions.length,
                    description:
                      questions[gameState.currentQuestion].description,
                    timeLeft: questionTimeout
                  })
                );
              }
            });
            setTimeout(() => {
              gameState.clients.forEach(c => {
                if (!validateSubmission(c)) {
                  c.state = "Lost";
                }
              });
              gameState.currentQuestion++;
              if (gameState.currentQuestion === questions.length) {
                wss.clients.forEach(function each(client) {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(
                      JSON.stringify({
                        type: "Status",
                        state: "GameOver",
                        winners: gameState.clients
                          .filter(c => c.state === "Playing")
                          .map(c => c.playerName),
                        losers: gameState.clients
                          .filter(c => c.state === "Lost")
                          .map(c => c.playerName)
                      })
                    );
                    client.close();
                  }
                });
              }
            }, questionTimeout);
          } else {
            ws.send(
              JSON.stringify({
                type: "Status",
                state: "WaitingStart",
                players: gameState.clients.map(c => c.playerName)
              })
            );
          }
        }
        break;
      case "Submit":
        if (gameState.clients.find(c => c.id === ws.id).state == "Playing") {
          gameState.clients.find(c => c.id === ws.id).submissions[
            message.qNum
          ] =
            message.code;
        }
        break;
      default:
        break;
    }
  });
});
