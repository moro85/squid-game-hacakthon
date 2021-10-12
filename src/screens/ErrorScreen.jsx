import React from 'react'
import styled from 'styled-components';
import { colors } from '../utils/colors';

const StyledErrorScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 1em;
    background: ${colors.squidGameDark};
    color: #fff;
    font-family: 'Pacifico', cursive;
    h1 {
        font-size: 5em;
        span {
            display: inline-block;
            text-align: center;
            width: 100%;
            font-size: 1.5em;
        }
    }
    h2 {
        &:first-of-type {
            margin-top: -1em;
        }
        margin-bottom: 0em;
        font-family: 'Roboto';
        font-size: 1.5em;
    }
`;

const ErrorScreen = ({ playerName, playerLeftNumber }) => {
    return (
        <StyledErrorScreen>
            <h1>Oops, something went wrong! <br /><span> 😟</span></h1>
            <h2>Either you got disconnected or the server is down.</h2>
            <h2>Refresh the page, it may help.</h2>
        </StyledErrorScreen>
    )
}

export default ErrorScreen
