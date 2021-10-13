import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useAudio } from '../hooks/use-audio';
import { colors } from '../utils/colors';
import { useAppState } from '../providers/AppStateProvider';
import { SCARY_TUNE } from '../utils/constants';


const StyledMainScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em;
    height: 100%;
    position: relative;
`;

const SquidGameLogo = styled.img`
    height: 150px;
`;

const JoinGamebutton = styled.button`
    background: ${colors.squidGamePink};
    border-radius: 1.5rem;
    color: #fff;
    border: 0;
    font-size: 2em;
    padding: .5em 1em;
    margin: 2rem;
    cursor: pointer;
    transition: .18s all;
    &:hover {
        transform: scale(1.1);
    }
`;

const MainScreenLog = styled.div`
    width: 300px;
    font-size: 18px;
    color: ${colors.lightGray};
    margin-top: 2em;
    position: relative;
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column-reverse;
        li {
            text-align: center;
            &:not(:first-of-type) {
                margin: .5em 0;
            }
        }
    }
    &::after {
        content: '';
        display: block;
        width: 300px;
        height: 50px;
        background: rgb(251,251,251);
        background: linear-gradient(0deg, rgba(251,251,251,1) 46%, rgba(251,251,251,0) 100%);
        position: absolute;
        bottom: -1.5em;
    }
`;

const PlayerNameInput = styled.input`
    margin-bottom: 1em;
    margin-top: 1em;
    border: 0;
    outline: none;
    text-align: center;
    padding: 0.4rem;
    border-bottom: 0.15rem solid ${colors.squidGamePink};
    font-size: 2rem;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: transparent;
    color: ${colors.squidGameDark};
`;

const GameAboutToStart = styled.div`
    font-size: 2rem;
    text-align: center;
`;

const Persons = styled.div`
    position: absolute;
    bottom: 0;
    height: 6.25rem;
    width: 100%;
    padding: 0 1.5em;
`;

const Person = styled.img`
    height: 6.25rem;
    position: absolute;
    margin-left: ${({ x }) => x}px;
    transform: ${({shouldFlip})=>shouldFlip === 1 ? 'scaleX(-1)' : 'scale(1)'};
`;

const PlayersWaiting = styled.p`
    width: 70vw;
    text-align: center;
    font-size: 1.75rem;
    margin-top: .5em;
    span {
        color: ${colors.squidGamePink};
    }
`;

const MainScreen = ({startGame, players}) => {
    const { appState: { maxPlayerCount, deviceType } } = useAppState();

    const [waiting, setWaiting] = useState(false)
    const [player, setPlayer] = useState("");
    const { setPlaying: shouldPlayScarySound, playing } = useAudio(SCARY_TUNE);

    const inputRef = useRef();

    useEffect(() => {
        inputRef?.current?.focus();
        return () => {
            shouldPlayScarySound(false)
        }
    }, [shouldPlayScarySound]);

    const onInputChanged = (e) => {
        // just for fun & cripiyness, playing the sound if there is value on the input
        const shouldPlayMusic = !!e.target.value;
        if (playing !== shouldPlayMusic) {
            shouldPlayScarySound(shouldPlayMusic);
        }
    };
    
    const startGameWrapper = () => {
        shouldPlayScarySound(false);
        setWaiting(true);
        return startGame(player);
    };
    
    const isSinglePlayerWaitingWithYou = players.length === 2;

    return (
        <StyledMainScreen>
            <SquidGameLogo src="./assets/sg_logo.png" alt="" isSmall={deviceType}/>
            { !waiting && <PlayerNameInput ref={inputRef} onChange={onInputChanged} autoComplete="false" placeholder="Enter your name" onKeyUp={(e) => {setPlayer(e.target.value); if (e.key === "Enter") startGameWrapper() }} /> }
            { !waiting && <JoinGamebutton type="button" onClick={startGameWrapper}>Join Game</JoinGamebutton> }
            { waiting && <GameAboutToStart>{player ? `${player}, ` : ''}Game about to start...</GameAboutToStart>}
            { waiting && <img src="./assets/spinner.gif" alt="spinner" />}
            { waiting && players.length && <PlayersWaiting>{players.length !== 1 ? <><span>{players.length - 1} {`player${!isSinglePlayerWaitingWithYou ? "s" : ""}`}</span> {isSinglePlayerWaitingWithYou ? 'is' : 'are'} waiting with you, until all {maxPlayerCount} of you join.</> : `Welcome to lobby. you are the first one. Make yourself at home until all ${maxPlayerCount} of you join.`}</PlayersWaiting>}
            <MainScreenLog>
                <ul>
                    {players && players.slice(-2).map((v)=>
                        (<li key={v} className="animate__animated animate__bounceIn">Player {(v < 100 && v > 10) ? `0${v}` : (v < 10) ? `00${v}` : v} Joined</li>)
                    )}
                </ul>
            </MainScreenLog>
            { waiting && <Persons>
                {players.map((v)=>
                        <Person src={`./assets/person${Math.round(Math.random() * (4 - 1)) + 1}.png`} key={JSON.stringify(v)} x={
                        Math.floor(Math.random() * (1100 - 0) + 0)
                        } shouldFlip={Math.round(Math.random() * (1 - 0)) + 1} alt="" />
                    )
                }
            </Persons>}
        </StyledMainScreen>
    )
}

export default MainScreen
