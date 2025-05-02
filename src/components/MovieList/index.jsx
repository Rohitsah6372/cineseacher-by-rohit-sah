import { movies } from "components/constants";
import MovieCard from "components/MovieCard";
import SearchBar from "components/SearchBar";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

const MovieList = () => (
  <div className="bg-[#f5f5f5]">
    <div>
      <SearchBar
        actionBlock={
          <Input
            className="m-2 rounded-md border-[#ddd] bg-white p-2"
            placeholder="Search Movies"
            prefix={<Search />}
            // ref={autoInputRef}
            type="Search"
            // value={searchKey}
            // onChange={e => {
            //   setSearchKey(e.target.value);
            //   setCurrentPage(DEFAULT_PAGE_INDEX);
            // }}
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
  </div>
);

export default MovieList;
