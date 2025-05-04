import { useState } from "react";

import { Modal } from "@bigbinary/neetoui";
import { Button, Typography } from "neetoui";
import useMoviesStore from "stores/useMovieStore";

const WarningModal = ({ id, title, setIsDeleted }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { removeMovie } = useMoviesStore();

  const handleClose = str => {
    if (str === "yes") {
      removeMovie(id);
    }
    setIsDeleted(prev => !prev);
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      <Modal
        closeButton
        closeOnEsc
        closeOnOutsideClick
        className="p-8"
        isOpen={isOpen}
        size="medium"
      >
        <Typography className="p-2 text-center" id="dialog1Title" style="h4">
          Do you realy wants to remove
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
    </div>
  );
};

export default WarningModal;
