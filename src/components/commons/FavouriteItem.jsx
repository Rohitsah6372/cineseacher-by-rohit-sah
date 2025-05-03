import { Typography } from "neetoui";

const FavouriteItem = ({ _, name }) => (
  <div className="m-2 rounded-lg border-4 border-blue-100 bg-white px-4 py-2 shadow-2xl">
    <Typography>{name}</Typography>
  </div>
);

export default FavouriteItem;
