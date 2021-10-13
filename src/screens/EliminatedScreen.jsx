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

const animationClasses = 'animate__animated animate__fadeInDown';

const EliminatedScreen = ({ playersStats: { eliminatedUsers }, playerName }) => {
    const crematoriumText = `${eliminatedUsers} players are waiting for you at the crematorium 🔥⚰️🔥️`;
    return (
        <StyledEliminatedScreen>
            <h1 className={animationClasses}>{`${playerName} Eliminated!`} <br/> 💀</h1>
            <h2 className={animationClasses}>{ crematoriumText }</h2>
            <img src="./assets/operator.png" alt=""/>
        </StyledEliminatedScreen>
    )
}

export default EliminatedScreen
