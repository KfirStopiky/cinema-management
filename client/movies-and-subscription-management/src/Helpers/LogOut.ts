import { useNavigate } from "react-router";

export const logout = () => {
  console.log("logout");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  localStorage.clear();
  navigate("/");
};
