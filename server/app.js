import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const questionTimeout = 10000;
const maxPlayerCount = 10;
const questions = [
  {
    description: "1",
    validators: [() => true]
  },
  {
    description: "2",
    validators: [() => true]
  }  
];
let gameState = {
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

let iterationHandle = null;

function validateSubmissions(client) {
  if (client.submissions[gameState.currentQuestion]) {
    return questions[gameState.currentQuestion].validators.every(validator =>
      validator(client.submissions[gameState.currentQuestion])
    );
  }
  return false;
}

function resetGame() {
gameState = {
    clients: [],
    currentQuestion: 0,
    state: "NotStarted"
  };
}


function playNextQuestion() {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "Question",
          qNum: gameState.currentQuestion,
          totalQ: questions.length,
          description: questions[gameState.currentQuestion].description,
          timeLeft: questionTimeout
        })
      );
    }
  });
  iterationHandle = setTimeout(() => {
    gameState.clients.forEach(c => {
      if (!validateSubmissions(c)) {
        c.status = "Lost";
      }
    });
    gameState.currentQuestion++;
    if (gameState.currentQuestion === questions.length) {
      gameState.state = "GameOver";
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "Status",
              state: "GameOver",
              winners: gameState.clients
                .filter(c => c.status === "Playing")
                .map(c => c.playerName),
              losers: gameState.clients
                .filter(c => c.status === "Lost")
                .map(c => c.playerName)
            })
          );
          client.close();
        }
      });
      resetGame();
    } else {
      playNextQuestion();
    }
  }, questionTimeout);
}

wss.on("connection", function connection(ws) {
  ws.id = wss.getUniqueID();
  ws.on('close', function close() {
    console.log('disconnected');
    const client = gameState.clients.find(c=>c.id === ws.id);
    if (client) {
        gameState.clients = gameState.clients.splice(gameState.clients.indexOf(client),1);
        if (gameState.clients.length === 0) {
            clearTimeout(iterationHandle);
            resetGame();
        }
    }
  });

  ws.on("message", function incoming(message) {
    message = JSON.parse(message);
    console.log(`Received message ${JSON.stringify(message)}`);
    switch (message.type) {
      case "Join":
        if (gameState.state !== "NotStarted") {
          ws.send(
            JSON.stringify({ type: "Status", state: "GameAlreadyStarted" })
          );
          return;
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
            gameState.state = "Started";
            playNextQuestion();
          } else {
            wss.clients.forEach(function each(client) {
              if (client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "Status",
                    state: "WaitingStart",
                    players: gameState.clients.map(c => c.playerName)
                  })
                );
              }
            });
          }
        }
        break;
      case "Submit":
        if (gameState.state !== "NotStarted") {
          if (gameState.clients.find(c => c.id === ws.id).status == "Playing") {
            gameState.clients.find(c => c.id === ws.id).submissions[
              message.qNum
            ] =
              message.code;
          }
        }
        break;
      default:
        break;
    }
  });
});
