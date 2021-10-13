import { VM } from "vm2";

export const messageState = {
    WAITING_START: "WaitingStart",
    QUESTION: "Question",
    PASSED: "Passed",
    PLAYING: "Playing",
    ELIMINATED: "Eliminated",
    GAME_OVER: "GameOver",
    PLAYER_ALREADY_JOINED: "PlayerAlreadyJoined",
    GAME_ALREADY_STARTED: "GameAlreadyStarted",
    START_GAME: "StartGame"
  };

export const messageType = {
    STATUS: "Status",
    USERS: "Users",
    JOIN: "Join",
    SUBMIT: "Submit",
    START_GAME: "StartGame"
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
    codeTemplate: "(arr) => {\n   return 5;\n}"
  },
  {
    description: "Write a function that accepts a string and reverse it!",
    validators: [code => runCodeIsolated(code, `"string"`) === "gnirts"],
    codeTemplate: "(str) => {\n   return '';\n}"
  },
  {
    description: "Write the constant function which always returns the number 42",
    validators: [code => runCodeIsolated(code, `"string"`) === 42],
    codeTemplate: "() => {\n   return 42;\n}"
  },
  {
    description: "Write a function that accepts an array and return its sum",
    validators: [code => runCodeIsolated(code, `[1,2,3]`) === 6],
    codeTemplate: "(arr) => {\n   return 5;\n}"
  },
  {
    description: "Write a function that accepts a number and returns how many digit it includes",
    validators: [code => runCodeIsolated(code, `123`) === 3],
    codeTemplate: "(num) => {\n   return 5;\n}"
  },
  {
    description: "Write a function that accepts a url as a string and returns only the domain name",
    validators: [code => runCodeIsolated(code, `https://www.google.com/search?val=mock`) === 'google'],
    codeTemplate: "(url) => {\n   return '';\n}"
  },
  {
    description: "Write a function that accepts a string and a delimiter and returns the substring which starts from the first delimiter and ends with the last",
    validators: [code => runCodeIsolated(code, `some#mock#string`) === 'google'],
    codeTemplate: "(str, delimiter) => {\n   return '';\n}"
  },
].sort(() => 0.5 - Math.random());
