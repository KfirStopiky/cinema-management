import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../../Services/AuthService";
import { addItem } from "../../Services/requests";
import TextField from "@mui/material/TextField";
import "./addMember.scss";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let resp = await addItem(
      "http://localhost:5000/api/members",
      memberDetails
    );
    console.log(memberDetails);
    if (resp.data.error === false) {
      navigate("/members");
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
          />
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
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Go back
          </button>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default AddMemberPage;
