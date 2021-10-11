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
  "STARTED": 1
}

function App() {

  const [gameStatus, setGameStatus] = useState(GAME_STATES.WAITING)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    exampleSocket.onopen = function (event) {
      var msg = {
        type: "Join",
        playerName: Math.random().toString()
      };
      exampleSocket.send(JSON.stringify(msg));
      
      exampleSocket.onmessage = function (event) {
        const msg = event.data;
        JSON.parse(msg);
        if ( msg.type === "Status" ) {
          setPlayers(msg.players)
        }
      }
    };
  }, [])

  const changeGameStatus = (newGameStatus) => {
    setGameStatus(newGameStatus);
  }

  return (
    <div className="App">
      <Container>
        <span>{players.join(", ")}</span>
        {gameStatus === GAME_STATES.WAITING && <MainScreen players={players} startGame={() => changeGameStatus(GAME_STATES.GET_READY)} />}
        {gameStatus === GAME_STATES.GET_READY && <GetReadyScreen />}
      </Container>
    </div>
  );
}

export default App;
