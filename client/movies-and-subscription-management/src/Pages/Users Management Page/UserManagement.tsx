import React, { useEffect } from "react";
import { getToken } from "../../Services/AuthService";
import { Outlet, useNavigate } from "react-router-dom";

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
    <div>
      <div className="btns">
        <button onClick={() => navigate("/manage-users")}>All Users</button>
        <button onClick={() => navigate("add")}>Add User</button>
      </div>
      <Outlet />
    </div>
  );
};

export default UserManagement;
