interface SetIdAction {
  type: "SET_ID";
  payload: string;
}
interface LoginAction {
  type: "LOGIN";
  payload?: any;
}

export type ActionType = SetIdAction | LoginAction;
