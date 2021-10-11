import React from 'react';
import { StyledQuestionScreen, StyledQuestionSubmitButton } from './StyledQuestionScreen';

export const QuestionScreen = ({ submitAnswer }) => {
  return (
    <StyledQuestionScreen>
      <h3>Challange #1:</h3>
      <h2>Code a factorial function in 30 seconds or less:</h2> 
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, provident.</p>
      <textarea>{`function fact(num) {\n\t\r}`}</textarea>
      <StyledQuestionSubmitButton onClick={submitAnswer}>Submit</StyledQuestionSubmitButton>
    </StyledQuestionScreen>
  )
}
