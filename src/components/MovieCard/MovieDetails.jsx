import { useEffect } from "react";

import PageLoader from "components/commons/PageLoader";
import { useClickedMovie } from "hooks/useQuery/useMovieApi";
import { Modal } from "neetoui";
import ErrorMessage from "src/commons/ErrorMessage";
import useMoviesStore from "stores/useMovieStore";

import ModalDetails from "./ModalDetails";

const MovieDetails = ({ id, setIsModalOpen }) => {
  const { data: movieDetails, isLoading, isError } = useClickedMovie(id);
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
      {isLoading ? <PageLoader /> : <ModalDetails {...{ movieDetails }} />}
    </Modal>
  );
};

export default MovieDetails;
