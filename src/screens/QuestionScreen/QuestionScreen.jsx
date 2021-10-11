import React from 'react';
import { QuestionContainer } from './StyledQuestionScreen';

export const QuestionScreen = ({ submitAnswer }) => {
  return (
    <QuestionContainer>
      <h2>The question is:</h2>
      <h2>Is it a bird or a plane?</h2>
      <button onClick={submitAnswer}>Submit</button>
    </QuestionContainer>
  )
}
