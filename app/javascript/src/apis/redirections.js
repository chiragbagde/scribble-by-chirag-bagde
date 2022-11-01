import axios from "axios";

const list = () => axios.get("/api/redirections");

const create = payload =>
  axios.post("/api/redirections", {
    redirection: payload,
  });

const update = (payload, id) => {
  axios.put(`/api/redirections/${id}`, {
    redirection: payload,
  });
};

const destroy = id => axios.delete(`/api/redirections/${id}`);

const redirectionsApi = { list, create, update, destroy };

export default redirectionsApi;
