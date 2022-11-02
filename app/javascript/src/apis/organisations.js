import axios from "axios";

const login = payload =>
  axios.post("/api/admin/session", {
    login: payload,
  });

const fetchUser = () => axios.get("/api/admin/users");

const fetch = () => axios.get("/api/admin/organisation");

const update = payload =>
  axios.put(`/api/admin/organisation`, {
    organisation: payload,
  });

const organisationsApi = {
  login,
  update,
  fetch,
  fetchUser,
};

export default organisationsApi;
