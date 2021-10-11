import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledMainScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em;
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
    margin-top: 2em;
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


const MainScreen = ({startGame, players}) => {

    return (
        <StyledMainScreen>
            <SquidGameLogo src="./assets/sg_logo.png" alt="" />
            <JoinGamebutton onClick={() => startGame()}>Join Game</JoinGamebutton>
            <MainScreenLog>
                <ul>
                    {players && players.slice(-2).map((v)=>
                        (<li key={v} className="animate__animated animate__bounceIn">Player {(v < 100 && v > 10) ? `0${v}` : (v < 10) ? `00${v}` : v} Joined</li>)
                    )}
                </ul>
            </MainScreenLog>
        </StyledMainScreen>
    )
}

export default MainScreen
