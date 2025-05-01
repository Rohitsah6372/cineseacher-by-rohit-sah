import { movies } from "components/constants";
import { Typography } from "neetoui";

import ViewHistoryItem from "./ViewHistoryItem";

const ViewHistory = () => {
  const moviesStore = movies;

  return (
    <div
      className=" overflow-y-auto"
      // ref={containerRef}
    >
      <Typography className="p-4 text-center font-bold">
        View history
      </Typography>
      {moviesStore.length > 0 &&
        moviesStore
          .filter(Boolean)
          .map(({ Title, imdbID }) => (
            <ViewHistoryItem key={imdbID} title={Title} />
          ))}
    </div>
  );
};

export default ViewHistory;
