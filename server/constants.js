import { VM } from "vm2";

export const messageState = {
    WAITING_START: "WaitingStart",
    QUESTION: "Question",
    PASSED: "Passed",
    PLAYING: "Playing",
    ELIMINATED: "Eliminated",
    GAME_OVER: "GameOver",
    PLAYER_ALREADY_JOINED: "PlayerAlreadyJoined",
    GAME_ALREADY_STARTED: "GameAlreadyStarted"
  };
  
export const messageType = {
    STATUS: "Status",
    USERS: "Users",
    JOIN: "Join",
    SUBMIT: "Submit"
  };

export const questionTimeout = 30000 * 10;
export const maxPlayerCount = 5;

function runCodeIsolated(code, params) {
    try {
      const vm = new VM({
        timeout: 1000,
        sandbox: {}
      });
  
      return vm.run(`(${code})(${params})`);
    } catch (error) {
      console.log(error);
    }
    console.log("Ran runCodeIsolated");
    return false;
  }

export const questions = [
  {
    description:
      "Write a function that accepts an array of native numbers as a parameter and returns the sum of multiplication of every two adjacent cells",
    validators: [code => runCodeIsolated(code, `[1,2,3]`) === 8],
    codeTemplate: "(arr) => {\n  \n}"
  }
];