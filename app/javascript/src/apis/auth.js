import axios from "axios";

const signup = payload =>
  axios.post("/users", {
    user: payload,
  });

const login = password =>
  axios.post("/session", {
    login: { password, site_name: "spinkart" },
  });

const fetchUserDetails = () => axios.get("/users");

const updateStatus = (payload, id) =>
  axios.put(`/users/${id}/update_status`, {
    user: payload,
  });

const update = (payload, id) =>
  axios.put(`/users/${id}`, {
    user: payload,
  });

const authApi = {
  login,
  updateStatus,
  signup,
  update,
  fetchUserDetails,
};

export default authApi;
