import axios from "axios";

const list = () => axios.get("/articles");

const filter = params => axios.get("/articles/filter", { params });

const filter_columns = () => axios.get("/articles/filter_columns");

const filter_by_category = params =>
  axios.get("/articles/filter_by_category", { params });

const filter_status = params =>
  axios.get("/articles/filter_status", { params });

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = slug => axios.get(`/articles/${slug}`);

const update = (payload, slug) => {
  axios.put(`/articles/${slug}`, {
    article: payload,
  });
};

const destroy = id => axios.delete(`/articles/${id}`);

const ArticlesApi = {
  list,
  create,
  update,
  show,
  destroy,
  filter_columns,
  filter_by_category,
  filter_status,
  filter,
};

export default ArticlesApi;
