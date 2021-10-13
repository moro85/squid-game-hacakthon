import {useState, useEffect} from 'react'
import styled from 'styled-components'
import './App.css';
import './animate.css'
import MainScreen from './screens/MainScreen';
import AdminScreen from './screens/AdminScreen/AdminScreen';
import GetReadyScreen from './screens/GetReadyScreen';
import { deviceType, messageState, messageType, NEW_PLAYER_SOUND, initialPlayersStats } from './utils/constants';
import { QuestionScreen } from './screens/QuestionScreen/QuestionScreen';
import PassScreen from './screens/PassScreen';
import EliminatedScreen from './screens/EliminatedScreen';
import GameOverScreen from './screens/GameOverScreen/GameOverScreen';
import { connectSocket, sendSocketMessage, socket } from './utils/socket';
import ErrorScreen from './screens/ErrorScreen';
import { useAudio } from './hooks/use-audio';
import { useAppState } from './providers/AppStateProvider';

const GAME_STATES = {
  "WAITING": 0,
  "GET_READY": 1,
  "STARTED": 2,
  "PASSED": 3,
  "ELIMINATED": 4,
  "ERROR": 5,
  "GAME_OVER": 6,
  "ADMIN": 7,
  "REFRESH_IS_NEEDED": 8
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #FBFBFB;
`;

const isAdmin = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return !!params.admin;
}

function App() {
  const { setAppState, appState: { appError } } = useAppState();
  const [gameStatus, setGameStatus] = useState(GAME_STATES.WAITING);
  const [playerName, setPlayerName] = useState('Player');
  const [players, setPlayers] = useState([]);
  const [playersStats, setPlayersStats] = useState(initialPlayersStats);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const { setPlaying: setPlayNewPlaySound } = useAudio(NEW_PLAYER_SOUND);
  const playNewPlayerSound = () => setPlayNewPlaySound(true);

  const submitAnswer = (answer, qNum) => {
    console.log(answer);
    sendSocketMessage(messageType.SUBMIT, { qNum, code: answer || 'sample answer' });
  };

  useEffect(() => {
    setAppState({ deviceType: deviceType.PHONE });
    if (isAdmin()) {
      setGameStatus(GAME_STATES.ADMIN);
    }
  }, [])

  useEffect(() => {
    socket.onopen = function (event) {
      socket.onmessage = function (event) {
        const msg = JSON.parse(event.data);
        console.log(msg);
          if ( msg.type === messageType.STATUS ) {
            switch (msg.state) {
              case messageState.WAITING_START:
                setPlayers(msg.players);
                setAppState({ maxPlayerCount: msg.maxPlayerCount });
                playNewPlayerSound();
                break;
              case messageState.QUESTION:
                setCurrentQuestion({
                  description: msg.description,
                  timeLeft: msg.timeLeft,
                  codeTemplate: msg.codeTemplate,
                  qNum: msg.qNum
                })
                setGameStatus(GAME_STATES.STARTED);
                break;
              case messageState.PASSED:
                setGameStatus(GAME_STATES.PASSED);
                break;
              case messageState.ELIMINATED:
                setGameStatus(GAME_STATES.ELIMINATED);
                break;
              case messageState.GAME_OVER:
                setGameStatus(GAME_STATES.GAME_OVER);
                break;
              case messageState.USERS:
                setPlayersStats({
                  passedUsers: msg.passedUsers,
                  eliminatedUsers: msg.eliminatedUsers,
                  stillPlayingUsers: msg.stillPlayingUsers,
                  total: msg.total
                })
              break;
              case messageState.START_GAME:
                setGameStatus(GAME_STATES.REFRESH_IS_NEEDED);
                break;
              default:
                setGameStatus(GAME_STATES.WAITING_START);
            }
        }
      }
    };

    socket.onclose = function (event) {
      if (gameStatus !== GAME_STATES.ELIMINATED && gameStatus !== GAME_STATES.GAME_OVER && gameStatus !== GAME_STATES.REFRESH_IS_NEEDED) {
        console.log("CONNECTION CLOSED")
        setGameStatus(GAME_STATES.ERROR);
      }
    }

    socket.onerror = function (event) {
        setGameStatus(GAME_STATES.ERROR);
    }
  }, [gameStatus, playNewPlayerSound])

  const changeGameStatus = (newGameStatus, playerName) => {
    setPlayerName(playerName);
    setGameStatus(newGameStatus);
    if (!sendSocketMessage(messageType.JOIN, {playerName})) {
      setAppState({appError: true})
    }
  }

  const setNewGame = (playersNumber) => {
    sendSocketMessage(messageType.START_GAME, { playersNumber });
  }

  const onRefresh = () => {
    connectSocket();
    setGameStatus(GAME_STATES.WAITING);
  }

  return (
    <div className="App">
      <Container>
        {(gameStatus === GAME_STATES.WAITING || gameStatus === GAME_STATES.REFRESH_IS_NEEDED )&& <MainScreen socket={socket} players={players} startGame={(playerName) => changeGameStatus(GAME_STATES.WAITING, playerName)} onRefresh={gameStatus === GAME_STATES.REFRESH_IS_NEEDED && onRefresh} />}
        {gameStatus === GAME_STATES.GET_READY && <GetReadyScreen />}
        {gameStatus === GAME_STATES.STARTED && <QuestionScreen question={currentQuestion} submitAnswer={submitAnswer} playersStats={playersStats} />}
        {gameStatus === GAME_STATES.PASSED && <PassScreen playerName={playerName} playersStats={playersStats} />}
        {gameStatus === GAME_STATES.ELIMINATED && <EliminatedScreen playerName={playerName} playersStats={playersStats} />}
        {(gameStatus === GAME_STATES.ERROR) && <ErrorScreen />}
        {gameStatus === GAME_STATES.GAME_OVER && <GameOverScreen playersStats={playersStats} />}
        {gameStatus === GAME_STATES.ADMIN && <AdminScreen startGame={setNewGame}/>}
      </Container>
    </div>
  );
}

export default App;
