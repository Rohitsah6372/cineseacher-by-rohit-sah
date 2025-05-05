import { useEffect } from "react";

import { ErrorMessage, PageLoader } from "components/commons";
import { useShowMovie } from "hooks/useQuery/useMovieApi";
import { Modal } from "neetoui";
import useMoviesStore from "stores/useMovieStore";

import MovieDetails from "./MovieDetails";

const MovieModal = ({ id, setIsModalOpen }) => {
  const { data: movieDetails, isLoading, isError } = useShowMovie(id);
  const { toggleInMovie } = useMoviesStore();

  useEffect(() => {
    if (movieDetails) {
      toggleInMovie(movieDetails);
    }
  }, [movieDetails, toggleInMovie]);

  if (isError) {
    return <ErrorMessage />;
  }

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
      {isLoading ? <PageLoader /> : <MovieDetails {...{ movieDetails }} />}
    </Modal>
  );
};

export default MovieModal;
