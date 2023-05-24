import axios from "axios";

const API_URL = 'http://localhost:8080/';

const login = (login: string, password: string) => {
  return axios.post(API_URL + "login", { login, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const resultRegistration = (login: string, password: string) => {
  return axios.post(API_URL + "registration", { login, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};

const AuthService = {
  login,
  resultRegistration,
  logout,
  getCurrentUser
};

export default AuthService;