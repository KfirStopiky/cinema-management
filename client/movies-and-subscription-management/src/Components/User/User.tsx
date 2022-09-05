import React from "react";
import "./user.scss";
import { deleteItem, getItemById } from "../../Services/requests";
import Button from "@mui/material/Button";
import EditUser from "../Edit user/EditUser";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeSharpIcon from "@mui/icons-material/ModeSharp";

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

  const [isOpen, setIsopen] = React.useState(false);
  const [selectedUserDeatils, setTelectedUserDeatils] = React.useState({});

  const editUser = async (id: string) => {
    let resp = await getItemById(`http://localhost:5000/api/users`, id);
    setTelectedUserDeatils(resp.data.user);
    setIsopen(true);
  };

  const handleClose = () => {
    setIsopen(false);
  };

  const deleteUser = async () => {
    await deleteItem(`http://localhost:5000/api/users`, user._id);
    getUsers();
  };

  return (
    <>
      <div className="user-container">
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="card-content">
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              First name: {user.firstName}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Last name: {user.lastName}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              User name: {user.userName}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Session time out: {user.sessionTimeOut}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Creation date:
              {moment(`${user.updatedAt}`).utc().format("DD/MM/YYYY")}
            </Typography>
            <Typography className="permissions-field"
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Permissions: {permissionsArr}
            </Typography>
          </CardContent>

          <div className="buttons-container">
            <div>
              <Button
                onClick={() => editUser(user._id)}
                variant="outlined"
                startIcon={<ModeSharpIcon />}
              >
                Edit
              </Button>
              {isOpen && (
                <EditUser
                  isOpen={isOpen}
                  setIsopen={setIsopen}
                  handleClose={handleClose}
                  selectedUserDeatils={selectedUserDeatils}
                  setTelectedUserDeatils={setTelectedUserDeatils}
                />
              )}
            </div>
            <Button
              onClick={deleteUser}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default User;
