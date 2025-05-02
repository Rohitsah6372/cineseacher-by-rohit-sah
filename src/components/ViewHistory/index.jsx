import { useEffect, useRef } from "react";

import { Typography } from "neetoui";
import useMoviesStore from "stores/useMovieStore";

import ViewHistoryItem from "./ViewHistoryItem";

const ViewHistory = () => {
  const { moviesStore, selectedMovieId } = useMoviesStore();
  // console.log("view History ", moviesStore);

  const movieItemRefs = useRef({});

  // Scrolling effect
  useEffect(() => {
    if (selectedMovieId && movieItemRefs.current[selectedMovieId]) {
      movieItemRefs.current[selectedMovieId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // clearSelectedMovieId();
    }
  }, [selectedMovieId]);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Typography className="p-4 text-center font-bold">
        View history
      </Typography>
      {moviesStore.length > 0 &&
        moviesStore
          .filter(Boolean)
          .map(({ title, imdbId }) => (
            <ViewHistoryItem
              id={imdbId}
              key={imdbId}
              ref={el => (movieItemRefs.current[imdbId] = el)}
              selectedMovieId={selectedMovieId}
              title={title}
            />
          ))}
    </div>
  );
};

export default ViewHistory;
