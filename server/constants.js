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
export const maxPlayerCount = 2;

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
  },
  {
    description: "Write a function that accepts a string and reverse it!",
    validators: [code => runCodeIsolated(code, `"string"`) === "gnirts"],
    codeTemplate: "(str) => {\n  \n}"
  },
  {
    description: "Write the constant function which always returns the number 42",
    validators: [code => runCodeIsolated(code, `"string"`) === 42],
    codeTemplate: "() => {\n  \n}"
  },
  {
    description: "Write a function that accepts an array and return its sum",
    validators: [code => runCodeIsolated(code, `[1,2,3]`) === 6],
    codeTemplate: "(arr) => {\n  \n}"
  },
  {
    description: "Write a function that accepts number and returns how many digit it includes",
    validators: [code => runCodeIsolated(code, `123`) === 3],
    codeTemplate: "(num) => {\n  \n}"
  },
].sort(() => 0.5 - Math.random());