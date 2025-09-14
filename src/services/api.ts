import axios from "axios";
import Config from "../config.json";

const Api = () => {
  return axios.create({
    // baseURL: Config.REACT_APP_FARMSTARCK_SERVICE,
    baseURL: Config.REACT_APP_LOCAL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default Api;
