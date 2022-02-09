import React, { useReducer, createContext, useContext } from "react";
import { initialState, reducer } from "../store/reducer";

const useAppReducer = () => {
  return useReducer(reducer, initialState);
};

type ReducerType = ReturnType<typeof useAppReducer>;
type State = ReducerType[0];
type Dispatch = ReducerType[1];

const stateContext = createContext<State | null>(null);
const dispatchContext = createContext<Dispatch | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AppStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useAppReducer();

  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
};

export function useAppState() {
  const ctx = useContext(stateContext);

  if (!ctx) {
    throw new Error("Missing state context");
  }

  return ctx;
}

export function useAppDispatch() {
  const ctx = useContext(dispatchContext);

  if (!ctx) {
    throw new Error("Missing dispatch context");
  }

  return ctx;
}