import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { useAudio } from '../../hooks/use-audio';
import { colors } from '../../utils/colors';
import { useAppState } from '../../providers/AppStateProvider';
import { SCARY_TUNE } from '../../utils/constants';


const StyledAdminScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1em;
    height: 100%;
    position: relative;
    background: lightgrey;
`;

const SquidGameLogo = styled.img`
    height: 150px;
`;

const JoinGamebutton = styled.button`
    background: ${colors.squidGamePink};
    border-radius: 1.5rem;
    color: #fff;
    border: 0;
    font-size: 2em;
    padding: .5em 1em;
    margin: 2rem;
    cursor: pointer;
    transition: .18s all;
    &:hover {
        transform: scale(1.1);
    }
`;

const PlayerNameInput = styled.input`
    margin-bottom: 1em;
    margin-top: 1em;
    border: 0;
    outline: none;
    text-align: center;
    padding: 0.4rem;
    border-bottom: 0.15rem solid ${colors.squidGamePink};
    font-size: 2rem;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background-color: transparent;
    color: ${colors.squidGameDark};
    width: 50%;
`;

const AdminScreen = ({startGame}) => {
    const { setAppState, appState: { deviceType } } = useAppState();

    const [playersNumber, setPlayersNumber] = useState();

    const inputRef = useRef();

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);
    
    const startGameWrapper = () => {
        setAppState({ maxPlayerCount: playersNumber})
        return startGame(playersNumber);
    };
    
    return (
        <StyledAdminScreen>
            <SquidGameLogo src="./assets/sg_logo.png" alt="" isSmall={deviceType}/>
            <PlayerNameInput ref={inputRef} autoComplete="false" placeholder="Enter players number" onKeyUp={(e) => {setPlayersNumber(Number(e.target.value)); if (e.key === "Enter") startGameWrapper() }} />
            <JoinGamebutton type="button" onClick={startGameWrapper}>Start game</JoinGamebutton>
        </StyledAdminScreen>
    );
}

export default AdminScreen
