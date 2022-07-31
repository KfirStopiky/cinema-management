import React, { useEffect,  } from "react";
import "./addUser.scss";
import { getToken } from "../../Services/AuthService";
// import { Link, useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import {addItem} from '../../Services/requests'
const AddUser: React.FC = () => {
  // const navigate = useNavigate();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   let resp = await addItem(firstName, lastName, userName, password);
  //   if (resp.data.error === false) {
  //     navigate("/");
  //   } else {
  //     alert(resp.data.message);
  //   }
  // };

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      // navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Register Form</h1>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setFirstName(e.target.value)}
            id="firstName"
            label="firstName"
            variant="outlined"
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setLastName(e.target.value)}
            id="lastName"
            label="lastName"
            variant="outlined"
          />{" "}
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setUserName(e.target.value)}
            id="userName"
            label="userName"
            variant="outlined"
          />{" "}
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setPassword(e.target.value)}
            id="password"
            label="password"
            variant="outlined"
          />{" "}
          <button type="submit">Sign Up!</button>
        </form>
        <div className="new-user">
          <p>
            <Link to={"/"}>Go Back</Link>
          </p>
        </div>
      </div>
      ); */}
    </div>
  );
};

export default AddUser;
