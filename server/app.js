import { WebSocket } from "ws";

import {
  messageState,
  messageType,
  maxPlayerCount,
  questionTimeout,
  questions
} from "./constants";

import {
  broadcast,
  registerOnDisconnect,
  registerOnJoin,
  registerOnSubmit,
  wss
} from "./socket-handler";

let gameState = getInitialGameState();


function validateSubmission(code, question) {
  if (code) {
    return question.validators.every(validator => validator(code));
  }
  return false;
}

function resetGame() {
  gameState = getInitialGameState();
  wss.clients.forEach(c => {
    c.close();
  })
}

function gameOver(ws) {
  gameState.state = messageState.GAME_OVER;
  ws.send(JSON.stringify({
    type: messageType.STATUS,
    state: messageState.GAME_OVER
  }));
  ws.close();
}

let iterationHandle = null;
function playNextQuestion() {
  broadcast({
    type: messageType.STATUS,
    state: messageState.QUESTION,
    qNum: gameState.currentQuestion,
    deFactoQuestionSerialNumber: gameState.deFactoQuestionSerialNumber,
    totalQ: questions.length,
    description: gameState.dyanmicQuestionsArray[gameState.currentQuestion].description,
    timeLeft: questionTimeout,
    codeTemplate: gameState.dyanmicQuestionsArray[gameState.currentQuestion].codeTemplate
  });

  removeCurrentQuestionFromArray();

  [...wss.clients]
    .filter(c => c.status !== messageState.ELIMINATED)
    .forEach(function each(client) {
      client.status = messageState.PLAYING;
    });
  iterationHandle = setTimeout(() => {
    gameState.deFactoQuestionSerialNumber++;
    gameState.currentQuestion = getRandomIndex(gameState.dyanmicQuestionsArray.length);
    if (!gameState.dyanmicQuestionsArray.length) {
      gameState.state = messageState.GAME_OVER;
      broadcast({
        type: messageType.STATUS,
        state: messageState.ELIMINATED
      });
      resetGame();
    } else {
      [...wss.clients]
        .filter(c => c.status === messageState.PLAYING)
        .forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: messageType.STATUS,
                state: messageState.ELIMINATED
              })
            );
          }
          client.status = messageState.ELIMINATED;
          client.close();
        });
      playNextQuestion();
    }
  }, questionTimeout);
}

registerOnSubmit((message, ws) => {
  if (
    gameState.isStarted &&
    message.qNum === gameState.currentQuestion &&
    ws.status !== messageState.ELIMINATED
  ) {
    if (
      validateSubmission(message.code, gameState.dyanmicQuestionsArray[gameState.currentQuestion])
    ) {
      ws.status = messageState.PASSED;
      ws.send(
        JSON.stringify({
          type: messageType.STATUS,
          state: messageState.PASSED
        })
      );

      if (!gameState.dyanmicQuestionsArray.length) {
        gameOver(ws);
        return;
      }
    } else {
      ws.status = messageState.ELIMINATED;
      ws.send(
        JSON.stringify({
          type: messageType.STATUS,
          state: messageState.ELIMINATED
        })
      );
      ws.close();
    }

    if (![...wss.clients].filter(c => c.status === messageState.PLAYING).length) {
      clearTimeout(iterationHandle);
      gameState.deFactoQuestionSerialNumber++;
      gameState.currentQuestion = getRandomIndex(gameState.dyanmicQuestionsArray.length);
      playNextQuestion();
    }

    broadcast({
      type: messageType.USERS,
      passedUsers: [...wss.clients].filter(c => c.status === messageState.PASSED).length,
      eliminatedUsers: maxPlayerCount - [...wss.clients].length,
      stillPlayingUsers: [...wss.clients].filter(c => c.status === messageState.PLAYING).length,
      total: maxPlayerCount
    });
  }
});

registerOnJoin((playerName, ws) => {
  if (gameState.isStarted) {
    ws.send(
      JSON.stringify({
        type: messageType.STATUS,
        state: messageState.GAME_ALREADY_STARTED
      })
    );
    return;
  }
  if (ws.playerName) {
    ws.send(
      JSON.stringify({
        type: messageType.STATUS,
        state: messageState.PLAYER_ALREADY_JOINED
      })
    );
  } else {
    ws.playerName = playerName;
    ws.status = messageState.PLAYING;
    if ([...wss.clients].filter(c => c.status === messageState.PLAYING).length === maxPlayerCount) {
      gameState.isStarted = true;
      playNextQuestion();
    } else {
      broadcast({
        type: messageType.STATUS,
        state: messageState.WAITING_START,
        players: [...wss.clients].map(c => c.playerName),
        maxPlayerCount
      });
    }
  }
});

registerOnDisconnect(client => {
  console.log("disconnected");
  if (wss.clients.size === 0) {
    clearTimeout(iterationHandle);
    resetGame();
  }
});

// Utils functions
function removeCurrentQuestionFromArray() {
  gameState.dyanmicQuestionsArray.splice(gameState.currentQuestion, 1);
}

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function getInitialGameState() {
  return {
    currentQuestion: getRandomIndex(questions.length),
    deFactoQuestionSerialNumber: 0,
    isStarted: false,
    dyanmicQuestionsArray: [...questions]
  };
}