import axios from "axios";

const list = () => axios.get("/options");

const update = (payload, id) => {
  axios.put(`/options/${id}`, {
    option: payload,
  });
};

const OptionsApi = { list, update };

export default OptionsApi;
