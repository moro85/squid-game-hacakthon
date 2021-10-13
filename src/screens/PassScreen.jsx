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

const animationClasses = 'animate__animated animate__fadeInDown';

const PassScreen = ({ playerName, playersStats: { passedUsers, eliminatedUsers, stillPlayingUsers } }) => {
    const eliminatedText = `${eliminatedUsers} players have met their grave 🪦`;
    const passedText = `${passedUsers} players are still with you`;
    const waitingText = `${stillPlayingUsers} players are still waiting to face their destiny 💀/🏅 before we continue to the next round...`;
    return (
        <StyledPassScreen>
            <h1 className={animationClasses}>{`${playerName} Passed!`} <br/> 🏅</h1>
            <h2 className={animationClasses}>{ eliminatedText }</h2>
            <h2 className={animationClasses}>{ passedText }</h2>
            <h2 className={animationClasses}>{ waitingText }</h2>
            <img className={animationClasses} src="./assets/spinner_white.gif" alt="" />
        </StyledPassScreen>
    )
}

export default PassScreen
