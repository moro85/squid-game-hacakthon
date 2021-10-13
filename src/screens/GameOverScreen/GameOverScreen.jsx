import React from 'react'
import { GameOverContainer } from './StyledGameOverScreen';
import { PLAYER_WORTH } from '../../utils/constants';

function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const playerWorthText = numberWithCommas(numberWithCommas(PLAYER_WORTH));

const GameOver = ({ playersStats: { passedUsers, eliminatedUsers } }) => {
    const passedText = `${(passedUsers > 1 ? `You and ${passedUsers} other competitors` : 'You')} have finished the game and won a shitty inflated Korean money`;
    const eliminatedText = `${eliminatedUsers} players were eliminated, each one of them worths ${playerWorthText}₩ (Korean Won)`;
    const moneySum = eliminatedUsers * PLAYER_WORTH;
    const convertText = `Wanna know how much is ${numberWithCommas(moneySum)}₩ ?`;
    return (
        <GameOverContainer>
            <h1>🏆 Congratulations 🏆</h1>
            <h2>You're this 💰💰💰 rich !</h2>
            <h2>{ passedText }</h2>
            <h2>{ eliminatedText }</h2>
            <h2>{ convertText } <a href={`https://www.xe.com/currencyconverter/convert/?Amount=${moneySum}&From=KRW&To=USD`}>Click here</a></h2>
        </GameOverContainer>
    )
}

export default GameOver
