import React from "react";
import "./user.scss";
import { deleteItem } from "../../Services/requests";

interface IProps {
  user: {
    _id: string;
    name: string;
    permissions?: any;
    userName: string;
    password: string;
    sessionTimeOut: string;
    updatedAt: string;
  };
  getUsers: () => void;
}

const User: React.FC<IProps> = ({ user, getUsers }) => {
  console.log(user);
  const deleteUser = async () => {
    console.log(user._id);
    await deleteItem(`http://localhost:5000/api/users`, user._id);
    getUsers();
  };
  return (
    <>
      <div className="user">
        Name:{user.name} <br />
        User name:{user.userName} <br />
        Permissions:{user.permissions} <br />
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
