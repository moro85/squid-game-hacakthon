import React, { createContext, useState, useContext } from 'react';
import { deviceType } from '../utils/constants';

export const initialAppState = {
  maxPlayerCount: null,
  deviceType: deviceType.PHONE
};

const StateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const [appState, setState] = useState(initialAppState);

  const setAppState = (newState) => setState({ ...appState, ...newState });

  return <StateContext.Provider value={{ appState, setAppState }}>{children}</StateContext.Provider>;
};
export const useAppState = () => useContext(StateContext);
