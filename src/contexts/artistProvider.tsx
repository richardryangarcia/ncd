import * as React from "react";
import { reducer, initialState, InitialValueType } from "./artistReducer";
import { Actions } from "./artistActions";

interface ProviderProps {
  children: any;
}

export interface ProviderState {
  state: InitialValueType;
  dispatch: React.Dispatch<Actions>;
}

const ArtistContext = React.createContext<ProviderState>({
  state: initialState,
  dispatch: {} as React.Dispatch<Actions>,
});

const ArtistsProvider: React.FC<ProviderProps> = (props: any) => {
  const children = props.children;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ArtistContext.Provider value={{ state, dispatch }}>
      {children}
    </ArtistContext.Provider>
  );
};

export { ArtistContext, ArtistsProvider };
