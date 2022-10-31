import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const fetch = () => axios.get("/organisation");

const fetchUser = () => axios.get("/users");

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
