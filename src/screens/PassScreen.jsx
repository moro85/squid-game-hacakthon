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
        font-size: 5em;
    }
    h2 {
        margin-top: -1em;
        font-family: 'Roboto';
        font-size: 1.5em;
    }
`;

const PassScreen = ({ playerLeftNumber, playerEliminatedNumber }) => {
    return (
        <StyledPassScreen className="animate__animated animate__zoomInLeft">
            <h1>You Passed!</h1>
            {/* <h2>{playerEliminatedNumber} users eliminated this round!</h2> */}
            {/* <h2>{playerLeftNumber} left!</h2> */}
            <h2>Waiting for all players to submit or fail to continue to the next round...</h2>
        </StyledPassScreen>
    )
}

export default PassScreen
