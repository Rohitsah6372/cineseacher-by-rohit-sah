import { DEFAULT_IMG_URL } from "components/contants";

const Image = ({ title, poster: url }) => {
  const fallbackSrc = DEFAULT_IMG_URL;

  return (
    <img
      alt={title}
      className="h-40 w-40"
      src={url}
      onError={e => {
        e.target.onerror = null;
        e.target.src = fallbackSrc;
      }}
    />
  );
};

export default Image;
