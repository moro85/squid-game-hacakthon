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
  
      console.log({code});
      console.log({params});

      return eval(`(${code})(${params})`);
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
    codeTemplate: "(arr) => {  }"
  },
  {
    description: "Write a function that accepts an array and returns in a new array only odd numbers",
    validators: [code => runCodeIsolated(code, `[1,2,3,4,5,6,7,8]`) == [2,4,6,8]],
    codeTemplate: "(str) => {  }"
  },
  {
    description: "Write a function the accepts a number, and returns it, but backwards",
    validators: [code => runCodeIsolated(code, `24`) === 42],
    codeTemplate: "(num) => {//(32) => 23//(1) => 1  }"
  },
  {
    description: "Write a function that accepts an array and return its sum",
    validators: [code => runCodeIsolated(code, `[1,2,3]`) === 6],
    codeTemplate: "(arr) => {//([1,2,3]) => 6//([100,-5]) => 95  }"
  },
  {
    description: "Write a function that accepts number and returns how many digit it includes",
    validators: [code => runCodeIsolated(code, `123`) === 3, code => runCodeIsolated(code, `1`) === 1],
    codeTemplate: "(num) => {  }"
  },
].sort(() => 0.5 - Math.random());