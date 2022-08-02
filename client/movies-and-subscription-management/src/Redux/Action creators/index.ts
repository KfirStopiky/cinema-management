import { Dispatch } from "redux";
import { ActionType } from "../Actions/index";

const setUserID = (userID: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: "SET_ID",
      payload: userID,
    });
  };
};

export default setUserID;
