import { useEffect, useRef } from "react";

import { Typography } from "neetoui";
import useMoviesStore from "stores/useMovieStore";

import ViewHistoryItem from "./ViewHistoryItem";

const ViewHistory = () => {
  const { moviesStore, selectedMovieId } = useMoviesStore();

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
    <div className=" overflow-y-auto" ref={containerRef}>
      <Typography className="p-4 text-center font-bold">
        View history
      </Typography>
      {moviesStore.length > 0 &&
        moviesStore
          .filter(Boolean)
          .map(({ Title, imdbID }) => (
            <ViewHistoryItem
              id={imdbID}
              key={imdbID}
              ref={el => (itemRefs.current[imdbID] = el)}
              selectedMovieId={selectedMovieId}
              title={Title}
            />
          ))}
    </div>
  );
};

export default ViewHistory;
