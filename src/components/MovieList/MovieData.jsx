import { NoDataToShow } from "components/commons";
import MovieCard from "components/MovieCard";
import { isEmpty } from "ramda";

const MovieData = ({ movieList }) => (
  <div>
    {isEmpty(movieList) ? (
      <div className="mt-8 flex h-full w-full flex-1 items-center justify-center pt-4">
        <NoDataToShow />
      </div>
    ) : (
      // <div className="h-4/6 overflow-y-auto  px-2">
      <div className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movieList.map(movie => (
          <MovieCard key={movie["imdbId"]} movie={movie} />
        ))}
      </div>
      // </div>
    )}
  </div>
);

export default MovieData;
