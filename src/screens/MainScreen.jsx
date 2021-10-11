import React, { useState } from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledMainScreen = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 1em;
    height: 100%;
    position: relative;
`;

const SquidGameLogo = styled.img`
    width: 500px;
`;

const JoinGamebutton = styled.button`
    width: 690px;
    height: 82px;
    background: ${colors.squidGamePink};
    border-radius: 28px;
    color: #fff;
    border: 0;
    font-size: 34px;
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
    padding: .5em;
    border-bottom: 3px solid ${colors.squidGamePink};
    font-size: 35px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
`;

const GameAboutToStart = styled.div`
    font-size: 30px;
`;

const Persons = styled.div`
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 100%;
    padding: 0 1.5em;
`;

const Person = styled.img`
    height: 100px;
    position: absolute;
    margin-left: ${({x})=>x}px;
    transform: ${({shouldFlip})=>shouldFlip === 1 ? 'scaleX(-1)' : 'scale(1)'};
`;

const PlayersWaiting = styled.div`
    font-size: 28px;
    margin-top: .5em;
    span {
        color: ${colors.squidGamePink};
    }
`;


const MainScreen = ({startGame, players}) => {

    const [waiting, setWaiting] = useState(false)
    const [player, setPlayer] = useState("");


    return (
        <StyledMainScreen>
            {/* Add Salt fish sound here */}
            <SquidGameLogo src="./assets/sg_logo.png" alt="" />
            { !waiting && <PlayerNameInput autoComplete="false" placeholder="Enter your name" onKeyUp={(e) => {setPlayer(e.target.value); if (e.key === "Enter") startGame(setWaiting, player)}} /> }
            { !waiting && <JoinGamebutton onClick={() => startGame(setWaiting, player)}>Join Game</JoinGamebutton> }
            { waiting && <GameAboutToStart>{player}, Game about to start...</GameAboutToStart>}
            { waiting && <img src="./assets/spinner.gif" alt="spinner" />}
            { waiting && <PlayersWaiting><span>{players.length-1} players</span> are waiting with you</PlayersWaiting>}
            <MainScreenLog>
                <ul>
                    {players && players.slice(-2).map((v)=>
                        (<li key={v} className="animate__animated animate__bounceIn">Player {(v < 100 && v > 10) ? `0${v}` : (v < 10) ? `00${v}` : v} Joined</li>)
                    )}
                </ul>
            </MainScreenLog>
            { waiting && <Persons>
                {players.map((v)=>
                        <Person src={`./assets/person${Math.round(Math.random() * (4 - 1))}.png`} key={v} x={
                        Math.floor(Math.random() * (1100 - 0) + 0)
                        } shouldFlip={Math.round(Math.random() * (1 - 0)) + 1} alt="" />
                    )
                }
            </Persons>}
        </StyledMainScreen>
    )
}

export default MainScreen
