import axios from "axios";

const list = () => axios.get("/api/categories");

const filter = params => axios.get("/api/categories/filter", { params });

const create = payload =>
  axios.post("/api/categories", {
    category: payload,
  });

const update = (payload, id) => {
  axios.put(`/api/categories/${id}`, {
    category: payload,
  });
};

const updatePosition = positions => {
  axios.put(`/api/categories/update_order`, {
    category: { positions },
  });
};

const destroy = id => axios.delete(`/api/categories/${id}`);

const categoriesApi = { list, create, update, destroy, updatePosition, filter };

export default categoriesApi;
