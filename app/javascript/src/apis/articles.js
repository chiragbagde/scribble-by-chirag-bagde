import axios from "axios";

const list = params => axios.get("/api/public/articles", { params });

const create = payload =>
  axios.post("/api/public/articles", {
    article: payload,
  });

const show = id => axios.get(`/api/public/articles/${id}`);

const update = (payload, id) => {
  axios.put(`/api/public/articles/${id}`, {
    article: payload,
  });
};

const count = () => axios.get("/api/public/articles/count");

const destroy = id => axios.delete(`/api/public/articles/${id}`);

const articlesApi = {
  list,
  create,
  update,
  show,
  destroy,
  count,
};

export default articlesApi;
