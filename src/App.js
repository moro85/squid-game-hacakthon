import {useState, useEffect} from 'react'
import styled from 'styled-components'
import './App.css';
import './animate.css'
import MainScreen from './screens/MainScreen';
import GetReadyScreen from './screens/GetReadyScreen';
import io from "socket.io-client";

// const socket = io.connect('ws://localhost:8080');
var exampleSocket = new WebSocket("ws://localhost:8080", []);

const Container = styled.div`
  width: 1200px;
  height: 700px;
  background: #FBFBFB;
`;

const GAME_STATES = {
  "WAITING": 0,
  "GET_READY": 1
}

function App() {

  const [gameStatus, setGameStatus] = useState(GAME_STATES.WAITING)
  const [players, setPlayers] = useState([])

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
      </Container>
    </div>
  );
}

export default App;
