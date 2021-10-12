import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { StyledQuestionScreen, StyledQuestionSubmitButton, EditorContainer } from './StyledQuestionScreen';

const StyledProgressBar = styled.div`
  width: 100%;
  height: 30px;
  position: absolute;
  top: 0;
  display: flex;
  > div {
    background: ${({width})=> width < 50 ? 'yellow' : '#fff'};
    width: ${({width})=>width}%;
    transition: .18s all;
  }
`;

export const QuestionScreen = ({ submitAnswer, question }) => {
  const [code, setCode] = useState(question.codeTemplate);
  const [timeLeft, setTimeLeft] = useState(question.timeLeft || 0);

  useEffect(() => {
    setInterval(()=>{
      setTimeLeft(timeLeft => timeLeft -= 1000);
    },1000);
  },[])

  return (
    <StyledQuestionScreen>
      <StyledProgressBar width={Math.floor(timeLeft / question.timeLeft * 100)}><div></div></StyledProgressBar>
      <h3>Challange #1:</h3>
      <h2>{question.description}</h2>
      <p>You have {parseInt(timeLeft)/1000} seconds to finish</p>
      <EditorContainer>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </EditorContainer>
      <StyledQuestionSubmitButton onClick={() => {submitAnswer(code, question.qNum);}}>Submit</StyledQuestionSubmitButton>
    </StyledQuestionScreen>
  )
}
