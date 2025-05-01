import { Button, Typography } from "neetoui";

import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie }) => {
  const { Title: title, Year, Poster: poster } = movie;

  return (
    <div>
      <div
        className="bg-white-900 flex w-56 flex-col
      items-center justify-between  rounded-xl p-4 shadow-2xl"
        // onClick={handleClick}
      >
        <div className="h-2/2 px-4">
          <img
            alt={title}
            className="h-full w-full object-cover"
            src={poster}
          />
        </div>
        <Typography className="text-center font-bold ">{title}</Typography>
        <Typography className="text-gray-500">Movie - {Year}</Typography>
        <Button
          className="m-1 self-start text-center text-blue-700 shadow-sm"
          label="View details"
          style="tertiary"
        />
      </div>
      <MovieDetails />
    </div>
  );
};

export default MovieCard;
