import React, { useState } from 'react';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { StyledQuestionScreen, StyledQuestionSubmitButton, EditorContainer } from './StyledQuestionScreen';

export const QuestionScreen = ({ submitAnswer }) => {
  const [code, setCode] = useState(`function foo(a, b) {\n  return a + b;\n}`);

  return (
    <StyledQuestionScreen>
      <h3>Challange #1:</h3>
      <h2>Code a factorial function in 30 seconds or less:</h2>
      <p>Some description</p>
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
      <StyledQuestionSubmitButton onClick={submitAnswer}>Submit</StyledQuestionSubmitButton>
    </StyledQuestionScreen>
  )
}
