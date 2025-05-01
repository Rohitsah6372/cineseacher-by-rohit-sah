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

    console.log("Tot results : ", response.data);
    if (response.data.Search) {
      console.log("Response.data.Search");
      response.data.search = response.data.Search.map(item => item);
      // delete response.data.Search;

      return response.data;
    } else if (response.data) {
      console.log("Response.data");

      return response.data;
    } else if (response) {
      console.log("Response");

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
