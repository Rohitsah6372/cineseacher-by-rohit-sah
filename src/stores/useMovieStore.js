import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMoviesStore = create(
  persist(
    set => ({
      selectedMovieId: null,
      moviesStore: [],
      toggleInMovie: movie =>
        set(({ moviesStore }) => {
          const found = moviesStore.some(
            movieDetail => movieDetail.imdbID === movie.imdbID
          );

          return {
            moviesStore: found ? moviesStore : [movie, ...moviesStore],
            selectedMovieId: movie.imdbID,
          };
        }),
      // clearSelectedMovieId: () => set({ selectedMovieId: null }),
    }),
    { name: "movie-store" }
  )
);

export default useMoviesStore;
