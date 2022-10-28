import axios from "axios";

const list = () => axios.get("/categories");

const filter = params => axios.get("/categories/filter", { params });

const create = payload =>
  axios.post("/categories", {
    category: payload,
  });

const update = (payload, id) => {
  axios.put(`/categories/${id}`, {
    category: payload,
  });
};

const updatePosition = (positions, id) => {
  axios.put(`/categories/${id}/update_order`, {
    category: { positions, id },
  });
};

const destroy = id => axios.delete(`/categories/${id}`);

const categoriesApi = { list, create, update, destroy, updatePosition, filter };

export default categoriesApi;
