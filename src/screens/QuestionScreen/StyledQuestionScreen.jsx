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
        font-size: 2em;
        padding: 0 5em;
    }
    h3 {
        font-size: 1.5em;
        margin-bottom: 1.5em;
        opacity: 0.85;
    }
    p {
        font-family: 'Roboto';
        margin-bottom: 2.5em;
    }
    textarea {
        width: 500px;
        height: 300px;
        background-color: #fff;
        padding: 1em;
        border-radius: 8px;
        border: 0;
        outline: none;
        font-family: 'Roboto';
        font-size: 1.25em;
        margin-bottom: 2em;
    }
`;

export const StyledQuestionSubmitButton = styled.button`
    margin-top: 16px;
    background: #fff;
    padding: .5em 1em;
    border: 0;
    border-radius: 8px;
    font-size: 18px;
    &:hover {
        cursor: pointer;
    }
`;

export const EditorContainer = styled.div`
    background: #000;
    width: 30rem;
    height: 10rem;
    border-radius: 4px;
  
  .token.operator {
    background: #000;
  }
`;
