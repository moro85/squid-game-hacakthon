import React from 'react'
import { GameOverContainer } from './StyledGameOverScreen';

const GameOver = ({ winners }) => {
    console.log({ winners });
    return (
        <GameOverContainer>
            <h1>🏆 Congratulations 🏆</h1>
            <h2>You're this 💰💰💰 rich !</h2>
            <h2>{ (winners?.length > 1 ? `You and ${winners.length} other competitors` : 'You') + ' have finished the game and won a shitty inflated Korean money' }</h2>
            <h2>Wanna know how much is 45 billion "Korean Won"?</h2>
        </GameOverContainer>
    )
}

export default GameOver
