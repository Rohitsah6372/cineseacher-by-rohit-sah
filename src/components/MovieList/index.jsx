import { useEffect, useRef, useState } from "react";

import { Input } from "@bigbinary/neetoui";
import { ErrorMessage, PageLoader } from "components/commons";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/contants";
import SearchBar from "components/SearchBar";
import useDebounce from "hooks/useDebounce";
import usefilterMovie from "hooks/usefilterMovie";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { Filter, Search } from "neetoicons";
import { Pagination } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import FilterList from "./FilterList";
import MovieData from "./MovieData";

const MovieList = () => {
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

  const { t } = useTranslation();

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

  const newMovieList = usefilterMovie(movieList, year, movieType);

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
          <FilterList {...{ setYear, setMovieType, setIsFilterOpen }} />
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <MovieData movieList={newMovieList} />
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
