import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../../Services/AuthService";
import { addItem } from "../../Services/requests";
import TextField from "@mui/material/TextField";
import "./addMember.scss";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();

  const [memberDetails, setMemberDetails] = useState<{
    name: string;
    email: string;
    city: string;
  }>({
    name: "",
    email: "",
    city: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let resp = await addItem(
      "http://localhost:5000/api/members",
      memberDetails
    );
    console.log(memberDetails);
    if (resp.data.error === false) {
      navigate("/subscriptions");
    } else {
      alert(resp.data.message);
    }
  };

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="add-member-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMemberDetails({ ...memberDetails, name: e.target.value })}
            id="name"
            label="name"
            variant="outlined"
          />{" "}
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMemberDetails({ ...memberDetails, email: e.target.value })}
            id="email"
            label="email"
            variant="outlined"
          />{" "}
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMemberDetails({ ...memberDetails, city: e.target.value })}
            id="city"
            label="city"
            variant="outlined"
          />{" "}
          <br />
          <div className="btns-container">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              variant="contained"
            >
              Back
            </Button>
            <Button
              onClick={(e) => handleSubmit(e)}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMemberPage;
