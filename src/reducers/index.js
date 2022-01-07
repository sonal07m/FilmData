import { combineReducers } from "redux";

import filmReducer from "./filmReducer";

const appReducer = combineReducers({
  film: filmReducer,
});

export default appReducer;
