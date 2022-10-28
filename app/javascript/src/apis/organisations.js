import axios from "axios";

const signup = payload =>
  axios.post("/organisations", {
    organisation: payload,
  });

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const fetch = () => axios.get("/organisations");

const updateStatus = (payload, id) =>
  axios.put(`/organisations/${id}/update_status`, {
    organisation: payload,
  });

const update = (payload, id) =>
  axios.put(`/organisations/${id}`, {
    organisation: payload,
  });

const organisationsApi = {
  login,
  updateStatus,
  signup,
  update,
  fetch,
};

export default organisationsApi;
