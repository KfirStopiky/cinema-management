import React, { useEffect, useState } from "react";
import "./users.scss";
import { getAllItems } from "../../Services/requests";
import User from "../User/User";
import { UserType } from "../../Types/user";

const Users: React.FC = () => {
  const [users, setUsers] = useState<[UserType] | null | undefined>();

  const getUsers = async () => {
    let resp = await getAllItems("http://localhost:5000/api/users");
    let users: [UserType] = resp.data.allUsers;
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <h1>Users</h1>

      {users &&
        users.map((user: UserType, i: number) => {
          return (
            <User
              key={i}
              user={user}
              permissions={user.permissions}
              getUsers={getUsers}
            />
          );
        })}
    </>
  );
};

export default Users;
