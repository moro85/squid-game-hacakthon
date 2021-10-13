export const messageState = {
    "WAITING_START": "WaitingStart",
    "QUESTION": "Question",
    "PASSED": "Passed",
    "ELIMINATED": "Eliminated",
    "GAME_OVER": "GameOver",
    "PLAYER_ALREADY_JOINED": "PlayerAlreadyJoined",
    "GAME_ALREADY_STARTED": "GameAlreadyStarted",
    "USERS": "Users"
}

export const messageType = {
    "STATUS": "Status",
    "JOIN": "Join",
    "SUBMIT": "Submit"
}

export const deviceType = {
    PHONE: "Phone",
    COMPUTER: "Computer"
}

// SOUNDS
export const NEW_PLAYER_SOUND = 'assets/sounds/pop.mp3';
export const SCARY_TUNE = 'assets/sounds/salt_fish.mp3';

export const initialPlayersStats = {
    passedUsers: 0,
    eliminatedUsers: 0,
    stillPlayingUsers: 0,
    total: 0
};

export const PLAYER_WORTH = 100000000;
