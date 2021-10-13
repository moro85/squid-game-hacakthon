import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const StyledQuestionScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background: ${colors.squidGamePink};
    color: #fff;
    font-family: 'Pacifico', cursive;
    position: relative;
    h2 {
        margin-top: -1em;
        margin-bottom: 0;
        font-family: 'Roboto';
        font-size: 1.5em;
        padding: 0em;
        width: 90%;
        text-align: center;
        margin-bottom: 1em;
    }
    h3 {
        font-size: 2.5em;
        margin-bottom: 1.5em;
        opacity: 0.85;
    }
    p {
        font-family: 'Roboto';
        font-size: 1.25em;
        margin-bottom: 2.5em;
    }
    textarea {
        background-color: #fff;
        padding: 1em;
        border-radius: 8px;
        border: 0;
        outline: none;
        font-family: 'Roboto';
        font-size: 1.25em;
        margin-bottom: 2em;
        overflow: auto;
    }
`;

export const StyledQuestionSubmitButton = styled.button`
    margin-top: 16px;
    background: #fff;
    padding: .5em 1em;
    border: 0;
    border-radius: 8px;
    font-size: 2em;
    &:hover {
        cursor: pointer;
    }
`;

export const EditorContainer = styled.div`
    background: #000;
    width: 90%;
    min-height: 10rem;
    max-height: 20rem;
    border-radius: 4px;
  
  .token.operator {
    background: #000;
  }

`;

export const StyledProgressBar = styled.div`
  width: 100%;
  height: 1.875rem;
  position: absolute;
  top: 0;
  display: flex;
  > div {
    background: ${({ width }) => width < 50 ? 'yellow' : width < 25 ? 'red' : '#fff'};
    width: ${({ width }) => width}%;
    transition: .18s all;
  }
`;

export const QuestionDescription = styled.h2`
  width: 60%;
`;
