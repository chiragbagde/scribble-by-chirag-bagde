import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const fetchUser = () => axios.get("/users");

const fetch = () => axios.get("/organisation");

const update = payload =>
  axios.put(`/organisation`, {
    organisation: payload,
  });

const organisationsApi = {
  login,
  update,
  fetch,
  fetchUser,
};

export default organisationsApi;
