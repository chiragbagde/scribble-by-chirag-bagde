import axios from "axios";

const list = params => axios.get("/api/public/categories", { params });

const create = payload =>
  axios.post("/api/public/categories", {
    category: payload,
  });

const update = (payload, id) => {
  axios.put(`/api/public/categories/${id}`, {
    category: payload,
  });
};

const updatePosition = (position, id) => {
  axios.put(`/api/admin/categories/${id}/update_order`, {
    category: { position, id },
  });
};

const destroy = (id, params) =>
  axios.delete(`/api/admin/categories/${id}`, { params });

const categoriesApi = { list, create, update, destroy, updatePosition };

export default categoriesApi;
