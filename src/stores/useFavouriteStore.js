import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritStore = create(
  persist(
    (set, get) => ({
      favouriteList: [],
      isMoviePresentInFavourite: movieId => {
        const { favouriteList } = get();

        return favouriteList.filter(Boolean).some(item => item.id === movieId);
      },
      toggleInMovie: (favId, favName) =>
        set(({ favouriteList }) => {
          const found = favouriteList.some(item => item.id === favId);

          const updatedList = found
            ? favouriteList.filter(item => item.id !== favId)
            : [{ id: favId, name: favName }, ...favouriteList];

          return {
            favouriteList: updatedList,
          };
        }),
    }),
    { name: "favourite-store" }
  )
);

export default useFavouritStore;
