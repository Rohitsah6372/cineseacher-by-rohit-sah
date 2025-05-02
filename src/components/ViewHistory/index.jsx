import { useEffect, useRef } from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useMoviesStore from "stores/useMovieStore";

import Item from "./Item";

const ViewHistory = () => {
  const { t } = useTranslation();
  const { moviesStore, selectedMovieId } = useMoviesStore();

  const movieItemRefs = useRef({});

  useEffect(() => {
    if (selectedMovieId && movieItemRefs.current[selectedMovieId]) {
      movieItemRefs.current[selectedMovieId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedMovieId]);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Typography className="p-4 text-center font-bold">
        {t("viewHistoryTitle")}
      </Typography>
      {moviesStore.length > 0 ? (
        moviesStore
          .filter(Boolean)
          .map(({ title, imdbId }) => (
            <Item
              id={imdbId}
              key={imdbId}
              ref={el => (movieItemRefs.current[imdbId] = el)}
              selectedMovieId={selectedMovieId}
              title={title}
            />
          ))
      ) : (
        <Typography className="p-4 text-center text-gray-500">
          {t("noHistoryAvailable")}
        </Typography>
      )}
    </div>
  );
};

export default ViewHistory;
