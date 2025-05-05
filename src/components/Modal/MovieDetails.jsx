import { Image } from "components/commons";
import { Favorite } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavouritStore from "stores/useFavouriteStore";

import Genres from "./Genres";

const MovieDetails = ({ movieDetails }) => {
  const { t } = useTranslation();
  // const [isFavorited, setIsFavorited] = useState(false);

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
    imdbId,
  } = movieDetails || {};

  // console.log("IMBDID : ", imdbId);

  const { isMoviePresentInFavourite, addMovie, removeMovie } =
    useFavouritStore();

  // console.log(favouriteList);

  return (
    <>
      <div className="mb-4">
        <div className="flex">
          <Typography className="text-left text-xl font-bold" id="dialog1Title">
            {title}
          </Typography>
          <div className="ml-4">
            {isMoviePresentInFavourite(imdbId) ? (
              <Button
                icon={Favorite}
                style="danger"
                tooltipProps={{
                  content: "Remove from favourite",
                  position: "right",
                }}
                onClick={() => removeMovie(movieDetails)}
              />
            ) : (
              <Button
                icon={Favorite}
                style="tertiary"
                tooltipProps={{
                  content: "Add to favourite",
                  position: "right",
                }}
                onClick={() => addMovie(movieDetails)}
              />
            )}
          </div>
        </div>
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

export default MovieDetails;
