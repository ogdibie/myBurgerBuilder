import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-myburger-48827.firebaseio.com/",
});

export default instance;
