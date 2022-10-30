import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const fetch = () => axios.get("/organisation");

const update = payload =>
  axios.put(`/organisation`, {
    organisation: payload,
  });

const organisationsApi = {
  login,
  update,
  fetch,
};

export default organisationsApi;
