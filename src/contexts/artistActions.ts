export enum ActionTypes {
  UPDATE_ARTIST = "UPDATE_ARTIST",
  GET_ARTISTS_SUCCESS = "GET_ARTISTS_SUCCESS",
}

interface UpdateArtistAction {
  type: ActionTypes.UPDATE_ARTIST;
  payload: { name: string; data: any };
}

export const addArtist = (payload: {
  name: string;
  data: any;
}): UpdateArtistAction => {
  return { type: ActionTypes.UPDATE_ARTIST, payload };
};

interface GetArtistsSuccessAction {
  type: ActionTypes.GET_ARTISTS_SUCCESS;
  payload: any;
}

export const getArtistsSuccess = (payload: any): GetArtistsSuccessAction => {
  return {
    type: ActionTypes.GET_ARTISTS_SUCCESS,
    payload,
  };
};

export type Actions = UpdateArtistAction | GetArtistsSuccessAction;
