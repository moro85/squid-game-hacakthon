import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { StyledQuestionScreen, StyledQuestionSubmitButton, EditorContainer, StyledProgressBar, QuestionDescription } from './StyledQuestionScreen';

export const QuestionScreen = ({ submitAnswer, question }) => {
  const [code, setCode] = useState(question?.codeTemplate || "");
  const [timeLeft, setTimeLeft] = useState(question.timeLeft || 30000);

  useEffect(() => {
    setCursorAtMiddleOfText();
    setInterval(() => {
      setTimeLeft(timeLeft => timeLeft -= 1000);
    }, 1000);
  }, [])

  return (
    <StyledQuestionScreen>
      <StyledProgressBar width={Math.floor(timeLeft / question.timeLeft * 100) || 100}><div></div></StyledProgressBar>
      <h3>Challange #{question.qNum + 1}:</h3>
      <QuestionDescription>{question.description || "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio accusantium vero voluptas veniam neque explicabo placeat eligendi numquam doloremque nemo?"}</QuestionDescription>
      <EditorContainer>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: '20px',
            overflow: 'auto'
          }}
        />
      </EditorContainer>
      <StyledQuestionSubmitButton onClick={() => submitAnswer(code, question.qNum)}>Submit</StyledQuestionSubmitButton>
    </StyledQuestionScreen>
  )
}

function setCursorAtMiddleOfText() {
  const element = Array.from(document.getElementsByTagName('textarea'))[0];
  element.focus();
  const position = element.value.length - 2;
  element.setSelectionRange(position, position);
}
