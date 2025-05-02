import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Genres from "./Genres";
import Image from "./Image";

const ModalDetails = ({ movieDetails }) => {
  const { t } = useTranslation();

  const {
    title,
    genre: genres,
    poster,
    plot,
    director,
    actors,
    boxoffice,
    year,
    runtime,
    language,
    rated,
  } = movieDetails || {};

  return (
    <>
      <div className="mb-4">
        <Typography className="text-left text-xl font-bold" id="dialog1Title">
          {title}
        </Typography>
        <div>
          <Genres {...{ genres }} />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 rounded-2xl p-4">
          <Image {...{ title, poster }} />
        </div>
        <div className="col-span-2 pl-8 pt-4 text-gray-700">
          <Typography>{plot}</Typography>
          <Typography>
            <span className="font-bold text-black  ">{t("director")} : </span>
            {director}
          </Typography>
          <Typography>
            <span className="font-bold text-black">{t("actor")} : </span>
            {actors}
          </Typography>
          <Typography>
            <span className="font-bold text-black">{t("boxOffice")} : </span>
            {boxoffice}
          </Typography>
          <Typography>
            <span className="font-bold text-black">{t("year")} : </span>
            {year}
          </Typography>
          <Typography>
            <span className="font-bold text-black">{t("runtime")} : </span>
            {runtime}
          </Typography>
          <Typography>
            <span className="font-bold text-black">{t("language")} : </span>
            {language}
          </Typography>
          <Typography>
            <span className="font-bold text-black">{t("rated")} : </span>
            {rated}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ModalDetails;
