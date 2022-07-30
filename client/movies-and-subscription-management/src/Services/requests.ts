import axios from 'axios'

export const getAllItems = (url:string) => {
  return axios.get(url);
};


