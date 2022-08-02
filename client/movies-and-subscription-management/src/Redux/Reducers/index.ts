import { combineReducers } from "redux";
import reducer from "../Reducers/selectedUserIdReducer";

const reducers = combineReducers({
  userID: reducer,
});

export default reducers;
