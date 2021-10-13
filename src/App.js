import {useState, useEffect} from 'react'
import styled from 'styled-components'
import './App.css';
import './animate.css'
import MainScreen from './screens/MainScreen';
import GetReadyScreen from './screens/GetReadyScreen';
import { deviceType, messageState, messageType, NEW_PLAYER_SOUND } from './utils/constants';
import { QuestionScreen } from './screens/QuestionScreen/QuestionScreen';
import PassScreen from './screens/PassScreen';
import EliminatedScreen from './screens/EliminatedScreen';
import GameOverScreen from './screens/GameOverScreen/GameOverScreen';
import { sendSocketMessage, socket } from './utils/socket';
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
  "GAME_OVER": 6
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #FBFBFB;
`;

function App() {
  const { setAppState } = useAppState();
  const [gameStatus, setGameStatus] = useState(GAME_STATES.WAITING);
  const [players, setPlayers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const { setPlaying: setPlayNewPlaySound } = useAudio(NEW_PLAYER_SOUND);
  const playNewPlayerSound = () => setPlayNewPlaySound(true);

  const submitAnswer = (answer, qNum) => {
    console.log(answer);
    sendSocketMessage(messageType.SUBMIT, { qNum, code: answer || 'sample answer' });
  };

  useEffect(() => { 
    setAppState({ deviceType: deviceType.PHONE });
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
                setWinners(msg.winners);
                break;
              default:
                setGameStatus(GAME_STATES.WAITING_START);
              break;
            }
        }
      }
    };

    socket.onclose = function (event) {
      if (gameStatus !== GAME_STATES.ELIMINATED && gameStatus !== GAME_STATES.GAME_OVER) {
        setGameStatus(GAME_STATES.ERROR);
      }
    }
  }, [gameStatus, playNewPlayerSound])

  const changeGameStatus = (newGameStatus, playerName) => {
    setGameStatus(newGameStatus);
    sendSocketMessage(messageType.JOIN, {playerName});
  }

  return (
    <div className="App">
      <Container>
        {gameStatus === GAME_STATES.WAITING && <MainScreen socket={socket} players={players} startGame={(playerName) => changeGameStatus(GAME_STATES.WAITING, playerName)} />}
        {gameStatus === GAME_STATES.GET_READY && <GetReadyScreen />}
        {gameStatus === GAME_STATES.STARTED && <QuestionScreen question={currentQuestion} submitAnswer={submitAnswer} />}
        {gameStatus === GAME_STATES.PASSED && <PassScreen playerLeftNumber={30} playerEliminatedNumber={5}/>}
        {gameStatus === GAME_STATES.ELIMINATED && <EliminatedScreen playerName={456} playerLeftNumber={20}/>}
        {gameStatus === GAME_STATES.ERROR && <ErrorScreen />}
        {gameStatus === GAME_STATES.GAME_OVER && <GameOverScreen winners={winners} />}
      </Container>
    </div>
  );
}

export default App;
