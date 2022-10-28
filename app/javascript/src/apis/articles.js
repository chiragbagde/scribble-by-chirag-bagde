import axios from "axios";

const list = () => axios.get("/articles");

const filter = params => axios.get("/articles/filter", { params });

const filterByCategory = params =>
  axios.get("/articles/filter_by_category", { params });

const filterStatus = params => axios.get("/articles/filter_status", { params });

const filterColumns = params =>
  axios.get("/articles/filter_columns", { params });

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = id => axios.get(`/articles/${id}`);

const update = (payload, id) => {
  axios.put(`/articles/${id}`, {
    article: payload,
  });
};

const destroy = id => axios.delete(`/articles/${id}`);

const articlesApi = {
  list,
  create,
  update,
  show,
  destroy,
  filterByCategory,
  filterStatus,
  filter,
  filterColumns,
};

export default articlesApi;
