import { DEFAULT_IMG_URL } from "components/contants";

const Image = ({ title, poster: posterUrl }) => {
  const fallbackPosterUrl = DEFAULT_IMG_URL;

  const handleImageError = event => {
    event.target.onerror = null;
    event.target.src = fallbackPosterUrl;
  };

  return (
    <img
      alt={title}
      className="h-40 w-40"
      src={posterUrl}
      onError={handleImageError}
    />
  );
};

export default Image;
