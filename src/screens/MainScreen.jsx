import React from 'react'
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
        li {
            text-align: center;
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

const MainScreen = () => {
    return (
        <StyledMainScreen>
            <SquidGameLogo src="./assets/sg_logo.png" alt="" />
            <JoinGamebutton>Join Game</JoinGamebutton>
            <MainScreenLog>
                <ul>
                    <li>Player 005 Joined</li>
                </ul>
            </MainScreenLog>
        </StyledMainScreen>
    )
}

export default MainScreen
