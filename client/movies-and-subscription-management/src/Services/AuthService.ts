import axios from "axios";

export const register = (name: String, userName: String, password: String) => {
  return axios.post(`http://localhost:5000/api/auth/register`, {
    name,
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
  // console.log(localStorage.getItem("token"));
  return localStorage.getItem("token");
};

export const saveToken = (token: String) => {
  localStorage.setItem("token", JSON.stringify(token));
};
