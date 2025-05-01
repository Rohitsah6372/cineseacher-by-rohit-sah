import moviesApi from "apis/movie";
import { useQuery } from "react-query";

export const useSearchedMovie = (searchTerm, currentPage) =>
  useQuery({
    queryKey: [searchTerm, currentPage],
    queryFn: () => moviesApi.fetch(searchTerm, currentPage),
    enabled: !!searchTerm,
    keepPreviousData: true,
  });

export const useClickedMovie = imbdId =>
  useQuery({
    queryKey: [imbdId],
    queryFn: () => moviesApi.show(imbdId),
    enabled: !!imbdId,
  });
