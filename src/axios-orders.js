import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-dbdda.firebaseio.com/",
});

export default instance;
