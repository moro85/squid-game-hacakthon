import React from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledPassScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 1em;
    background: ${colors.squidGamePink};
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
        padding: .5em;
        text-align: center;
    }
    img {
        
    }
`;

const PassScreen = ({ playerLeftNumber, playerEliminatedNumber }) => {
    return (
        <StyledPassScreen>
            <h1 className="animate__animated animate__fadeInDown">You Passed! <br/> 💵</h1>
            <h2 className="animate__animated animate__fadeInDown">Waiting for all players to submit or fail to continue to the next round...</h2>
            <img className="animate__animated animate__fadeInDown" src="./assets/spinner_white.gif" alt="" />
        </StyledPassScreen>
    )
}

export default PassScreen
