import React from "react";
import "./user.scss";
import { deleteItem, getItemById } from "../../Services/requests";
import Button from "@mui/material/Button";
import EditUser from "../Edit user/EditUser";
interface IProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
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

  const [open, setOpen] = React.useState(false);
  const [selectedUserDeatils, setTelectedUserDeatils] = React.useState({});

  const editUser = async (id: string) => {
    let resp = await getItemById(`http://localhost:5000/api/users`, id);
    setTelectedUserDeatils(resp.data.user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () => {
    await deleteItem(`http://localhost:5000/api/users`, user._id);
    getUsers();
  };

  return (
    <>
      <div className="user">
        First name:{user.firstName} <br />
        Last name:{user.lastName} <br />
        User name:{user.userName} <br />
        Permissions:
        {permissionsArr}
        <br />
        Session time out(minutes): {user.sessionTimeOut} <br />
        Creation time: {user.updatedAt} <br />
        <div className="btns">
          <div>
            <Button variant="outlined" onClick={() => editUser(user._id)}>
              Edit
            </Button>
            {open && (
              <EditUser
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                selectedUserDeatils={selectedUserDeatils}
              />
            )}
          </div>
          <Button variant="outlined" onClick={deleteUser}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default User;
