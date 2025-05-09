import { Modal } from "@bigbinary/neetoui";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useMoviesStore from "stores/useMovieStore";

const WarningModal = ({ id, title, setIsDeleted, closeModal }) => {
  const { removeMovie } = useMoviesStore();
  const { t } = useTranslation();

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
      title={t("deleteConfirmation")}
      onClose={closeModal}
    >
      <Typography className="p-2 text-center" id="dialog1Title" style="h4">
        {t("deleteConfirmation")}
      </Typography>
      <Typography className="pb-4 text-center " style="h2">
        {title}
      </Typography>
      <div className="flex justify-evenly p-2">
        <Button
          className="px-8"
          label={t("confirm")}
          style="danger"
          onClick={() => handleClose("yes")}
        />
        <Button
          className="px-8"
          label={t("cancel")}
          style="primary"
          onClick={() => handleClose("no")}
        />
      </div>
    </Modal>
  );
};

export default WarningModal;
