import axios from "axios";


const sampleURL = "http://localhost:5000"

// create a new "instance" of the axios module that has the Auth header built-in
export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: sampleURL
  });
};
