import {useState, useEffect} from 'react'
import styled from 'styled-components'
import './App.css';
import './animate.css'
import MainScreen from './screens/MainScreen';
import GetReadyScreen from './screens/GetReadyScreen';
import io from "socket.io-client";
import { QuestionScreen } from './screens/QuestionScreen/QuestionScreen';
import PassScreen from './screens/PassScreen';
import EliminatedScreen from './screens/EliminatedScreen';

// const socket = io.connect('ws://localhost:8080');
var exampleSocket = new WebSocket("ws://localhost:8080", []);

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
      type: 'Submit',
      qNum: 1,
      code: answer || 'sample answer'
    };
    exampleSocket.send(JSON.stringify(msg));
  };

  useEffect(() => {
    exampleSocket.onopen = function (event) {
      exampleSocket.onmessage = function (event) {
        const msg = JSON.parse(event.data);
        if ( msg.type === "Status" ) {
          setPlayers(msg.players)
        }
      }
    };
  }, [])

  const changeGameStatus = (newGameStatus, setWaiting, playerName) => {
    setGameStatus(newGameStatus);
    var msg = {
      type: "Join",
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
        {gameStatus === GAME_STATES.STARTED && <QuestionScreen submitAnswer={submitAnswer} />}
        {gameStatus === GAME_STATES.PASSED && <PassScreen playerLeftNumber={30} playerEliminatedNumber={5}/>}
        {gameStatus === GAME_STATES.ELIMINATED && <EliminatedScreen playerName={456} playerLeftNumber={20}/>}
        <button onClick={() => changeGameStatus(GAME_STATES.PASSED)}>Pass</button>
        <button onClick={() => changeGameStatus(GAME_STATES.ELIMINATED)}>Eliminated</button>
      </Container>
    </div>
  );
}

export default App;
