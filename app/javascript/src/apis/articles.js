import axios from "axios";

const list = () => axios.get("/articles");

const ArticlesApi = { list };

export default ArticlesApi;
