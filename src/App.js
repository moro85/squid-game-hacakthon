import {useState, useEffect} from 'react'
import styled from 'styled-components'
import './App.css';
import './animate.css'
import MainScreen from './screens/MainScreen';
import GetReadyScreen from './screens/GetReadyScreen';
import { messageState, messageType } from './utils/constants';
import { playSound, NEW_PLAYER_SOUND } from './utils/sound';
import { QuestionScreen } from './screens/QuestionScreen/QuestionScreen';
import PassScreen from './screens/PassScreen';
import EliminatedScreen from './screens/EliminatedScreen';

const local = "ws://localhost:8080";
const prod = "ws://squid.azurewebsites.net";
var exampleSocket = new WebSocket(prod, []);

const Container = styled.div`
  width: 1200px;
  height: 700px;
  background: #FBFBFB;
`;

const GAME_STATES = {
  "WAITING": 0,
  "GET_READY": 1,
  "STARTED": 2,
  "PASSED": 3,
  "ELIMINATED": 4
}

function App() {

  const [gameStatus, setGameStatus] = useState(GAME_STATES.WAITING);
  const [players, setPlayers] = useState([]);

  const submitAnswer = (answer) => {
    const msg = {
      type: messageType.SUBMIT,
      qNum: 1,
      code: answer || 'sample answer'
    };
    exampleSocket.send(JSON.stringify(msg));
  };

  useEffect(() => {
    exampleSocket.onopen = function (event) {
      exampleSocket.onmessage = function (event) {
        const msg = JSON.parse(event.data);
        console.log(msg);
          if ( msg.type === messageType.STATUS ) { 
            switch (msg.state) {
              case messageState.WAITING_START:
                setPlayers(msg.players);
                playSound(NEW_PLAYER_SOUND);
                console.log('played sound!')
                break;
              case messageState.QUESTION: 
                setGameStatus(GAME_STATES.STARTED);
                break;
              case messageState.PASSED: 
                setGameStatus(GAME_STATES.PASSED);
                break;
              case messageState.ELIMINATED:
                setGameStatus(GAME_STATES.ELIMINATED);
                break;
            }
        }
      }
    };
  }, [])

  const changeGameStatus = (newGameStatus, setWaiting, playerName) => {
    setGameStatus(newGameStatus);
    var msg = {
      type: messageType.JOIN,
      playerName
    };
    exampleSocket.send(JSON.stringify(msg));
    setWaiting(true);
  }

  return (
    <div className="App">
      <Container>
        {gameStatus === GAME_STATES.WAITING && <MainScreen socket={exampleSocket} players={players} startGame={(setWaiting, playerName) => changeGameStatus(GAME_STATES.WAITING, setWaiting, playerName)} />}
        {gameStatus === GAME_STATES.GET_READY && <GetReadyScreen />}
        {gameStatus === GAME_STATES.STARTED && <QuestionScreen submitAnswer={() => submitAnswer()} />}
        {gameStatus === GAME_STATES.PASSED && <PassScreen playerLeftNumber={30} playerEliminatedNumber={5}/>}
        {gameStatus === GAME_STATES.ELIMINATED && <EliminatedScreen playerName={456} playerLeftNumber={20}/>}
      </Container>
    </div>
  );
}

export default App;
