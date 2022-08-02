import {ActionType} from '../Actions/index'

const reducer = (state: string = "", action: ActionType) => {
  switch (action.type) {
    case "SET_ID":
      return state;

    case "LOGIN":
      return state;

    default:
      return state;
  }
};

export default reducer;
