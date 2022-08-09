import React from "react";
import { Outlet, useNavigate } from "react-router";
import "./subscriptionPage.scss";

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Subscriptions</h1>
      <div className="btns">
        <button onClick={() => navigate("/members")}>All members</button>
        <button onClick={() => navigate("/members/add")}>Add member</button>
      </div>
      <Outlet />
    </div>
  );
};

export default SubscriptionPage;
