import React from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledPassScreen = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 1em;
    background: ${colors.squidGameLight};
    color: #fff;
    font-family: 'Pacifico', cursive;
    h1 {
        font-size: 3.5em;
        text-align: center;
        line-height: 15ß0%;
    }
    h2 {
        margin-top: -1em;
        font-family: 'Roboto';
        font-size: 1.5em;
    }
    img {
        position: absolute;
        bottom: 5em;
        transform: scale(1.4);
    }
`;

const PassScreen = ({ playerLeftNumber, playerEliminatedNumber }) => {
    return (
        <StyledPassScreen className="animate__animated animate__zoomInLeft">
            <h1>You Passed! <br/> 💵</h1>
            <h2>Waiting for all players to submit or fail to continue to the next round...</h2>
            <img src="./assets/spinner_white.gif" alt="" />
        </StyledPassScreen>
    )
}

export default PassScreen
