import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
console.log("SERVER IS UP");

const questionTimeout = 60000;
const questions = [
    {
        description: '',
        validators: [()=>{}]
    }
]
const gameState = {
    clients: [],
    currentQuestion: 0,
    state: 'NotStarted',
}

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', function connection(ws) {
  console.log("CONNECTION");
  ws.id = wss.getUniqueID();
  ws.on('message', function incoming(message) {
    message = JSON.parse(message);
    console.log(`Received message ${JSON.stringify(message)}`);
    switch (message.type) {
        case 'Join':
            if (gameState.state !== 'NotStarted') {
                ws.send(JSON.stringify({type:'Status', state: 'GameAlreadyStarted'}));
            }
            if (gameState.clients.some(c => c.playerName.toLocaleLowerCase() === message.playerName.toLocaleLowerCase() || c.id === ws.id)) {
                ws.send(JSON.stringify({type:'Status', state: 'PlayerAlreadyJoined'}));
            }
            else {
                gameState.clients.push({playerName: message.playerName, submissions: [], status: 'Playing'});
                ws.send(JSON.stringify({type:'Status', state: 'WaitingStart', players: gameState.clients.map(c => c.playerName)}));
                console.log("Client added!");
            }
            break;
        case 'Submit':
            gameState.clients.find(c => c.id === ws.id).submissions[message.qNum] = message.code;
            break;    
        default:
            break;
    }
  });
});