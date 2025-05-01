import axios from "axios";
import { Toastr } from "neetoui";

const apikey = process.env.REACT_APP_OMDB_API_KEY;

const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    const { Response: responseData, Error: error } = response.data;

    if (responseData === "False") {
      Toastr.error(`${error}`, {
        autoClose: 2000,
      });
    }

    if (response.data.Search) {
      response.data.search = response.data.Search.map(item => item);

      return response.data;
    } else if (response.data) {
      return response.data;
    } else if (response) {
      return response;
    }

    return null;
  });
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = "https://www.omdbapi.com";
  axios.defaults.params = {};
  axios.defaults.params["apikey"] = apikey;
  setHttpHeaders();
  responseInterceptors();
}
