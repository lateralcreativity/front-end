import axios from "axios";


const techPalURL = "https://techpal.herokuapp.com"

// create a new "instance" of the axios module that has the Auth header built-in
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: techPalURL
  });
};
