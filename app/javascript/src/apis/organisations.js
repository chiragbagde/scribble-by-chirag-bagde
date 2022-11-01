import axios from "axios";

const login = payload =>
  axios.post("/api/session", {
    login: payload,
  });

const fetchUser = () => axios.get("/api/users");

const fetch = () => axios.get("/api/organisation");

const update = payload =>
  axios.put(`/api/organisation`, {
    organisation: payload,
  });

const organisationsApi = {
  login,
  update,
  fetch,
  fetchUser,
};

export default organisationsApi;
