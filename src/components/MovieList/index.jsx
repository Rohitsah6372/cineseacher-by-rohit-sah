import { useEffect, useRef, useState } from "react";

import ErrorMessage from "components/commons/ErrorMessage";
import NoDataToShow from "components/commons/NoDataToShow";
import PageLoader from "components/commons/PageLoader";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/contants";
import SearchBar from "components/SearchBar";
import useDebounce from "hooks/useDebounce";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { buildUrl } from "utils/url";

import MovieCard from "./MovieCard";

const MovieList = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchKey = useDebounce(searchTerm);
  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_INDEX);

  const { page = DEFAULT_PAGE_INDEX } = useQueryParams();

  const routerHistory = useHistory();
  const autoInputRef = useRef(null);

  useEffect(() => {
    if (page) {
      setCurrentPageNumber(Number(page));
    }
  }, [page]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault();
        autoInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const {
    data: { search: movieList = [], totalResults: totalMovieCount } = {},
    isLoading,
    isError,
  } = useSearchedMovie(debouncedSearchKey, currentPageNumber);

  const handlePageNavigation = page =>
    routerHistory.replace(
      buildUrl(routes.root, { page, pageSize: DEFAULT_PAGE_SIZE })
    );

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <div className="flex h-screen flex-col bg-[#f5f5f5]">
      <SearchBar
        actionBlock={
          <Input
            className="mx-2 rounded-md border-[#ddd] bg-white p-2 shadow-md"
            placeholder={t("searchMovies")}
            prefix={<Search />}
            ref={autoInputRef}
            type="Search"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPageNumber(DEFAULT_PAGE_INDEX);
            }}
          />
        }
      />
      {isEmpty(movieList) ? (
        <div className="flex h-full w-full items-center justify-center">
          <NoDataToShow />
        </div>
      ) : (
        <div className="h-4/6 overflow-y-auto  px-2">
          <div className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movieList.map(movie => (
              <MovieCard key={movie["imdbId"]} movie={movie} />
            ))}
          </div>
        </div>
      )}
      <div className="mb-5 mt-4 flex items-center justify-center border-t-4 shadow-2xl ">
        <Pagination
          count={totalMovieCount}
          navigate={page => handlePageNavigation(page)}
          pageNo={currentPageNumber || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default MovieList;
