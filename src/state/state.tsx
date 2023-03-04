import React, { createContext, useContext, useReducer } from "react";

import { Action } from "./reducer";
import { Phase } from "./types";

export type State = {
  phase: Phase,
  // affiliations: String[];
  // isTurkish: boolean;
};

const initialState: State = {
  phase: Phase.Intro
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
