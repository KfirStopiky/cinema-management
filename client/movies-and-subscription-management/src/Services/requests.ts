import axios from "axios";

export const getAllItems = (url: string) => {
  return axios.get(url);
};

export const deleteItem = (url: string, id: string) => {
  const config = {
    data: {
      id,
    },
  };
  return axios.delete(url, config);
};
export const addItem = (url: string, obj: any) => {
  return axios.delete(url, obj);
};
