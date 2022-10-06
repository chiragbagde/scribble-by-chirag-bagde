import axios from "axios";

const list = () => axios.get("/articles");

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = slug => axios.get(`/articles/${slug}`);

function update(payload, slug) {
  axios.put(`/articles/${slug}`, {
    article: payload,
  });
}
const destroy = slug => axios.delete(`/articles/${slug}`);

const ArticlesApi = { list, create, update, show, destroy };

export default ArticlesApi;
