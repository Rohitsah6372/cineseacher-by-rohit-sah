import { isEmpty } from "ramda";

const usefilterMovie = (movieList, year, { Movie: movie, Series: series }) => {
  console.log("Type : ", movie, series);

  let filteredList = movieList;

  if (!isEmpty(year)) {
    filteredList = movieList.filter(item => item.year === year);
  }

  if (movie) {
    filteredList = filteredList.filter(item => item.type === "movie");
  }

  if (series) {
    filteredList = filteredList.filter(item => item.type === "series");
  }

  return filteredList;
};

export default usefilterMovie;
