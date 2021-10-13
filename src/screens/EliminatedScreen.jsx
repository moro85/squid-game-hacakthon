import React from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledEliminatedScreen = styled.div`
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
        transform: scale(1.4);
        margin-top: 5em;
    }
`;

const EliminatedScreen = ({ playerName, playerLeftNumber }) => {
    return (
        <StyledEliminatedScreen>
            <h1 className="animate__animated animate__fadeInDown">Eliminated! <br/> 💀</h1>
            <h2 className="animate__animated animate__fadeInDown">{playerLeftNumber} left!</h2>
            <h2 className="animate__animated animate__fadeInDown">You were player {playerName}</h2>
            <img src="./assets/operator.png" alt=""/>
        </StyledEliminatedScreen>
    )
}

export default EliminatedScreen
