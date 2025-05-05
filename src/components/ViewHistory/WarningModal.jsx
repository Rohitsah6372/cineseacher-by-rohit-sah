import { Modal } from "@bigbinary/neetoui";
import { Button, Typography } from "neetoui";
import useMoviesStore from "stores/useMovieStore";

const WarningModal = ({ id, title, setIsDeleted, closeModal }) => {
  const { removeMovie } = useMoviesStore();

  const handleClose = choice => {
    if (choice === "yes") {
      setIsDeleted(true);
      setTimeout(() => {
        removeMovie(id);
        closeModal();
      }, 500);
    } else {
      closeModal();
    }
  };

  return (
    <Modal
      closeButton
      closeOnEsc
      closeOnOutsideClick
      isOpen
      className="p-8"
      size="medium"
      onClose={closeModal}
    >
      <Typography className="p-2 text-center" id="dialog1Title" style="h4">
        Do you really wants to remove
      </Typography>
      <Typography className="pb-4 text-center " style="h2">
        {title}
      </Typography>
      <div className="flex justify-evenly p-2">
        <Button
          className="px-8"
          label="YES"
          style="danger"
          onClick={() => handleClose("yes")}
        />
        <Button
          className="px-8"
          label="NO"
          style="primary"
          onClick={() => handleClose("no")}
        />
      </div>
    </Modal>
  );
};

export default WarningModal;
