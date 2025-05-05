import { useEffect, useRef, useState } from "react";

import { Checkbox, Input } from "@bigbinary/neetoui";
import ErrorMessage from "components/commons/ErrorMessage";
import PageLoader from "components/commons/PageLoader";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/contants";
import SearchBar from "components/SearchBar";
import useDebounce from "hooks/useDebounce";
import usefilterMovie from "hooks/usefilterMovie";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { Close, Filter, Search } from "neetoicons";
import { Pagination, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { buildUrl } from "utils/url";

import MovieToBeShown from "./MovieToBeShown";

const MovieList = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchKey = useDebounce(searchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [year, setYear] = useState("");
  const [movieType, setMovieType] = useState({
    Movie: false,
    Series: false,
  });

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

  console.log(movieList);

  console.log("Year : ", isEmpty(year));

  const newMovieList = usefilterMovie(movieList, year, movieType);
  console.log("New Movie List ", newMovieList);

  return (
    <div className="relative flex h-screen flex-col bg-[#f5f5f5]">
      <SearchBar
        actionBlock={
          <>
            <Input
              className="mx-2 rounded-md border-[#ddd] bg-white p-2 "
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
            <button onClick={() => setIsFilterOpen(prev => !prev)}>
              <Filter className="outline-none mr-1 border-none border-[#ddd] p-0.5 shadow-md hover:text-green-700 " />
            </button>
          </>
        }
      />
      <div>
        {isFilterOpen && (
          <div className=" absolute right-4 top-16 z-50 h-48 w-96 rounded-md bg-white p-4 shadow-xl">
            <div className="flex justify-end ">
              <button onClick={() => setIsFilterOpen(prev => !prev)}>
                <Close className="outline-none h-4  w-4 border-none text-red-600 hover:bg-red-600 hover:font-bold hover:text-white " />
              </button>
            </div>
            <div className="">
              <Input
                className="font-bold"
                label="Year"
                onChange={e => setYear(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <Typography className="font-bold">Type</Typography>
              <div className="mt-2 flex">
                <Checkbox
                  label="Movie"
                  onChange={() => {
                    setMovieType(prev => ({ ...prev, Movie: !prev.Movie }));
                  }}
                />
                <Checkbox
                  label="Series"
                  onChange={() => {
                    setMovieType(prev => ({
                      ...prev,
                      Series: !prev.Series,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <MovieToBeShown movieList={newMovieList} />
      </div>
      <div className="mb-12 flex items-center justify-center border-t-4 pt-1 shadow-2xl ">
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
