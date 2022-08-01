import React from "react";
import "./user.scss";
import { deleteItem } from "../../Services/requests";

interface IProps {
  user: {
    _id: string;
    name: string;
    userName: string;
    password: string;
    sessionTimeOut: string;
    updatedAt: string;
  };
  permissions: {
    viewSubscriptions: boolean;
    createSubscriptions: boolean;
    deleteSubscriptions: boolean;
    viewMovies: boolean;
    createMovies: boolean;
    deleteMovies: boolean;
  };
  getUsers: () => void;
}

const User: React.FC<IProps> = ({ user, getUsers, permissions }) => {
  let permissionsArr = [];

  for (let perm in permissions) {
    permissionsArr.push(String(perm) + ",");
  }

  const deleteUser = async () => {
    await deleteItem(`http://localhost:5000/api/users`, user._id);
    getUsers();
  };

  return (
    <>
      <div className="user">
        Name:{user.name} <br />
        User name:{user.userName} <br />
        Permissions:
        {permissionsArr}
        <br />
        Session time out(minutes): {user.sessionTimeOut} <br />
        Creation time: {user.updatedAt} <br />
        <div className="btns">
          <button>Edit</button>
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default User;
