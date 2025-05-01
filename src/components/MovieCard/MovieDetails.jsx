import { useEffect } from "react";

import PageLoader from "components/commons/PageLoader";
import { useClickedMovie } from "hooks/useQuery/useMovieApi";
import { Modal, Typography } from "neetoui";
import ErrorMessage from "src/commons/ErrorMessage";
import useMoviesStore from "stores/useMovieStore";

import Image from "./Image";

const MovieDetails = ({ id, setIsModalOpen }) => {
  const { data: movieDetails, isLoading, isError } = useClickedMovie(id);
  const { toggleInMovie } = useMoviesStore();

  useEffect(() => {
    if (movieDetails) {
      toggleInMovie(movieDetails);
    }
  }, [movieDetails, toggleInMovie]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const {
    title,
    genre: genres,
    poster,
    plot,
    director,
    actors,
    boxOffice,
    year,
    runtime,
    language,
    rated,
  } = movieDetails;

  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
      isOpen
      className="flex  flex-col p-4"
      size="large"
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <div className="mb-4">
        <Typography className="text-left text-xl font-bold" id="dialog1Title">
          {title}
        </Typography>
        <div>
          {genres.split(", ").map(genre => (
            <Typography
              className="m-1 inline-block rounded-xl bg-gray-300 px-2 "
              key={genre}
              lineHeight="normal"
              style=""
            >
              {genre}
            </Typography>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 rounded-2xl p-4">
          <Image {...{ title, poster }} />
        </div>
        <div className="col-span-2 pl-8 pt-4 text-gray-700">
          <Typography>{plot}</Typography>
          <Typography>
            <span className="font-bold text-black  ">Director: </span>
            {director}
          </Typography>
          <Typography>
            <span className="font-bold text-black">Actor: </span>
            {actors}
          </Typography>
          <Typography>
            <span className="font-bold text-black">Box Office: </span>
            {boxOffice}
          </Typography>
          <Typography>
            <span className="font-bold text-black">Year: </span>
            {year}
          </Typography>
          <Typography>
            <span className="font-bold text-black">Runtime: </span>
            {runtime}
          </Typography>
          <Typography>
            <span className="font-bold text-black">Language: </span>
            {language}
          </Typography>
          <Typography>
            <span className="font-bold text-black">Rated: </span>
            {rated}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetails;
