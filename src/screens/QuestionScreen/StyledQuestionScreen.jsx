import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const QuestionContainer = styled.div`
    display: flex;
`;

export const StyledQuestionScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background: ${colors.squidGamePink};
    color: #fff;
    font-family: 'Pacifico', cursive;
    h2 {
        margin-top: -1em;
        margin-bottom: 0;
        font-family: 'Roboto';
        font-size: 2em;
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
    background: #fff;
    padding: .5em 1em;
    border: 0;
    border-radius: 8px;
    font-size: 18px;
    &:hover {
        cursor: pointer;
    }
`;