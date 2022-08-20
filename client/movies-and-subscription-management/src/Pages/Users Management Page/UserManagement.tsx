import React, { useEffect } from "react";
import "./userManagement.scss";
import { getToken } from "../../Services/AuthService";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const UserManagement: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <div className="btns">
        <Stack spacing={2} direction="row">
          <Button onClick={() => navigate("/manage-users")} variant="contained">
            All Users
          </Button>
          <Button onClick={() => navigate("/add")} variant="outlined">
            Add User
          </Button>
        </Stack>
      </div>
      <Outlet />
    </div>
  );
};

export default UserManagement;
