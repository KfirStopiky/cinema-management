import axios from "axios";

export const register = (
  firstName: string,
  lastName: string,
  userName: string,
  password: string
) => {
  return axios.post(`http://localhost:5000/api/auth/register`, {
    firstName,
    lastName,
    userName,
    password,
  });
};
export const login = (userName: String, password: String) => {
  return axios.post(`http://localhost:5000/api/auth/login`, {
    userName,
    password,
  });
};
export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveToken = (token: String) => {
  localStorage.setItem("token", JSON.stringify(token));
};
