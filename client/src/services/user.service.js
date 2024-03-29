import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getEmployeeBoard = () => {
  return axios.get(API_URL + "employee", { headers: authHeader() });
};

const getEmployerBoard = () => {
  return axios.get(API_URL + "employer", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getEmployeeBoard,
  getEmployerBoard
};