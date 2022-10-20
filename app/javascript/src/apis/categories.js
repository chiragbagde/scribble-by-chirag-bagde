import axios from "axios";

const list = () => axios.get("/categories");

const create = payload =>
  axios.post("/categories", {
    category: payload,
  });

const update = (payload, id) => {
  axios.put(`/categories/${id}`, {
    category: payload,
  });
};

const update_two = (positions, id) => {
  axios.put(`/categories/${id}/update_number_two`, {
    positions,
    id,
  });
};

const destroy = id => axios.delete(`/categories/${id}`);

const CategoriesApi = { list, create, update, destroy, update_two };

export default CategoriesApi;
