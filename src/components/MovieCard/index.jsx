import { useState } from "react";

import { Button, Typography } from "neetoui";

import Image from "./Image";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { imdbId, title, year, poster } = movie;

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="">
      <div
        className="bg-white-900 flex w-56 cursor-pointer
      flex-col items-center  justify-between rounded-xl p-4 shadow-2xl"
        onClick={handleClick}
      >
        <div className="h-2/2 px-4">
          <Image {...{ title, poster }} />
        </div>
        <Typography className="inline-block text-center font-bold">
          {title}
        </Typography>
        <Typography className="text-gray-500">Movie - {year}</Typography>
        <Button
          className="m-1 self-start text-center text-blue-700 shadow-sm"
          label="View details"
          style="tertiary"
        />
      </div>
      {isModalOpen && (
        <MovieDetails id={imdbId} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default MovieCard;
