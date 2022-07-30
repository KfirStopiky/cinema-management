import React, { useEffect } from "react";
import { getToken } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      navigate("/");
    }
  }, []);
  return <div>Home</div>;
};

export default Home;
