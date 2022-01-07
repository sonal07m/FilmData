import {
  RESET_STORE,
  GET_FILMS,
} from "../actions/types";

const INITIAL_STATE = {
  films: [],
  favoriteList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FILMS:
      return { ...state, films: action.payload };
    case RESET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
