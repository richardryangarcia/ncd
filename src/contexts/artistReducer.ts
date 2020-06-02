import { Reducer } from "react";
import { Actions, ActionTypes } from "./artistActions";

export interface InitialValueType {
  [id: string]: any;
}

export const initialState: InitialValueType = {};
export const reducer: Reducer<InitialValueType, Actions> = (
  state: InitialValueType,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ARTIST:
      return {
        ...state,
        [`${action.payload.name}`]: action.payload.data,
      };
    case ActionTypes.GET_ARTISTS_SUCCESS:
      return {
        ...state,
        artists: { ...state.artists, ...action.payload },
      };
    default:
      return state;
  }
};
