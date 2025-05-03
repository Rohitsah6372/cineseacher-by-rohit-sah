import useFavouritStore from "stores/useFavouriteStore";

import FavouriteItem from "./FavouriteItem";
import Header from "./Header";

const Favourites = () => {
  const data = 5;

  console.log(data);

  const { favouriteList } = useFavouritStore();

  return (
    <div className="h-screen w-screen overflow-hidden ">
      <Header />
      <div className="flex h-screen w-screen justify-center p-4">
        <div className="h-4/5 w-3/5 overflow-y-auto bg-white">
          {favouriteList.map(({ id, name }) => (
            <FavouriteItem key={id} {...{ id, name }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
