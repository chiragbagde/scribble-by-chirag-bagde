import axios from "axios";

const list = params => axios.get("/api/articles", { params });

const filter = params => axios.get("/api/articles/filter", { params });

const create = payload =>
  axios.post("/api/articles", {
    article: payload,
  });

const show = id => axios.get(`/api/articles/${id}`);

const update = (payload, id) => {
  axios.put(`/api/articles/${id}`, {
    article: payload,
  });
};

const destroy = id => axios.delete(`/api/articles/${id}`);

const articlesApi = {
  list,
  create,
  update,
  show,
  destroy,
  filter,
};

export default articlesApi;
