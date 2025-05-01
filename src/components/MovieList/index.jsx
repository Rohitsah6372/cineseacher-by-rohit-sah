import { useEffect, useRef, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/contants";
import MovieCard from "components/MovieCard";
import SearchBar from "components/SearchBar";
import useDebounce from "hooks/useDebounce";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { buildUrl } from "utils/url";

const MovieList = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const { page = DEFAULT_PAGE_INDEX } = useQueryParams();

  const history = useHistory();

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  const autoInputRef = useRef(null);

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
    data: {
      search: movies = [],
      totalResults,
      // Response: response,
      // Error: error,
    } = {},
    isLoading,
    isError,
  } = useSearchedMovie(debouncedSearchKey, currentPage);

  // console.log(response, error);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.root, { page, pageSize: DEFAULT_PAGE_SIZE })
    );

  console.log("Movies : ", movies);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <div className="bg-[#f5f5f5]">
      <div>
        <SearchBar
          actionBlock={
            <Input
              className="m-2 rounded-md border-[#ddd] bg-white p-2"
              placeholder="Search Movies"
              prefix={<Search />}
              ref={autoInputRef}
              type="Search"
              value={searchKey}
              onChange={e => {
                setSearchKey(e.target.value);
                setCurrentPage(DEFAULT_PAGE_INDEX);
              }}
            />
          }
        />
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-10 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isEmpty(movies) ? (
          <NoData className="h-full w-full" title="No movies to show" />
        ) : (
          movies.map(movie => <MovieCard key={movie["imdbID"]} movie={movie} />)
        )}
      </div>
      <div className="mb-5 self-end">
        <Pagination
          count={totalResults ? Math.ceil(totalResults / DEFAULT_PAGE_SIZE) : 0} // <-- Fix this line
          // navigate={page => setCurrentPage(page)}
          navigate={page => handlePageNavigation(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default MovieList;
