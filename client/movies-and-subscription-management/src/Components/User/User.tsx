import React from "react";
import "./user.scss";
import { deleteItem } from "../../Services/requests";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface IProps {
  user: {
    _id: string;
    name: string;
    userName: string;
    password: string;
    sessionTimeOut: string;
    updatedAt: string;
  };
  viewSubscriptions: any;
  createSubscriptions: any;
  deleteSubscriptions: any;
  viewMovies: object;
  createMovies: object;
  deleteMovies: object;
  getUsers: () => void;
}

const User: React.FC<IProps> = (user, getUsers) => {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const deleteUser = async () => {
    await deleteItem(`http://localhost:5000/api/users`, user.user._id);
    getUsers();
  };
  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    // <>
    //   <div className="user">
    //     Name:{user.user.name} <br />
    //     User name:{user.user.userName} <br />
    //     Permissions:
    //     {String(user.createMovies)
    //     } <br />
    //     Session time out(minutes): {user.user.sessionTimeOut} <br />
    //     Creation time: {user.user.updatedAt} <br />
    //     <div className="btns">
    //       <button>Edit</button>
    //       <button onClick={deleteUser}>Delete</button>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="user">
        Name:{user.user.name} <br />
        User name:{user.user.userName} <br />
        Permissions:
        <div>
          <FormControlLabel
            label="Parent"
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          {children}
        </div>
        <br />
        Session time out(minutes): {user.user.sessionTimeOut} <br />
        Creation time: {user.user.updatedAt} <br />
        <div className="btns">
          <button>Edit</button>
          <button onClick={deleteUser}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default User;
