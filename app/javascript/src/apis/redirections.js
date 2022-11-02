import axios from "axios";

const list = () => axios.get("/api/admin/redirections");

const create = payload =>
  axios.post("/api/admin/redirections", {
    redirection: payload,
  });

const update = (payload, id) => {
  axios.put(`/api/admin/redirections/${id}`, {
    redirection: payload,
  });
};

const destroy = id => axios.delete(`/api/admin/redirections/${id}`);

const redirectionsApi = { list, create, update, destroy };

export default redirectionsApi;
