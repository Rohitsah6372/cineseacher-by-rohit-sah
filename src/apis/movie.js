import axios from "axios";

// https://www.omdbapi.com/?s=joker&apikey=1315d9d2
const fetch = (searchTerm, currentPage) =>
  axios.get("/", {
    params: {
      s: searchTerm,
      page: currentPage,
      // pageSize: DEFAULT_PAGE_SIZE,
    },
  });

const show = imbdId =>
  axios.get("/", {
    params: {
      i: imbdId,
    },
  });

const moviesApi = { fetch, show };

export default moviesApi;
