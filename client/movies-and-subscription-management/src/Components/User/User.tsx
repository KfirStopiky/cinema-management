import React from "react";
import "./user.scss";

interface IProps {
  user: {
    id: String;
    name: String;
    permissions: [];
    userName: String;
    password: String;
    sessionTimeOut: String;
    updatedAt: String;
  };
}

const User: React.FC<IProps> = ({ user }) => {
  return (
    <div className="user">
      Name:{user.name} <br />
      User name:{user.userName} <br />
      Permissions:{user.permissions} <br />
      Session time out(minutes): {user.sessionTimeOut} <br />
      Creation time: {user.updatedAt} <br />
      <div className="btns">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default User;
