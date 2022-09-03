import { Button, Stack } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import "./subscriptionPage.scss";

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="subscriptions-page-container">
      <div className="btns-container">
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => navigate("/subscriptions")}
            variant="contained"
          >
            All members
          </Button>
          <Button
            onClick={() => navigate("/subscriptions/add")}
            variant="outlined"
          >
            Add member
          </Button>
        </Stack>
      </div>
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
};

export default SubscriptionPage;
