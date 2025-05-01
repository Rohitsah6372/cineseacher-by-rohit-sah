import { useEffect, useRef } from "react";

import { Typography } from "neetoui";
import useMoviesStore from "stores/useMovieStore";

import ViewHistoryItem from "./ViewHistoryItem";

const ViewHistory = () => {
  const { moviesStore, selectedMovieId } = useMoviesStore();
  // console.log("view History ", moviesStore);

  const containerRef = useRef({});

  const itemRefs = useRef({});

  useEffect(() => {
    if (selectedMovieId && itemRefs.current[selectedMovieId]) {
      itemRefs.current[selectedMovieId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // clearSelectedMovieId();
    }
  }, [selectedMovieId]);

  return (
    <div className="max-h-[400px] overflow-y-auto" ref={containerRef}>
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
              ref={el => (itemRefs.current[imdbId] = el)}
              selectedMovieId={selectedMovieId}
              title={title}
            />
          ))}
    </div>
  );
};

export default ViewHistory;
