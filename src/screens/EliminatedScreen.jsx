import React from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledEliminatedScreen = styled.div`
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

const EliminatedScreen = ({ playerName, playerLeftNumber }) => {
    return (
        <StyledEliminatedScreen className="animate__animated animate__zoomInLeft">
            <h1>Eliminated!</h1>
            <h2>{playerLeftNumber} left!</h2>
            <h2>You were player {playerName}</h2>
        </StyledEliminatedScreen>
    )
}

export default EliminatedScreen
