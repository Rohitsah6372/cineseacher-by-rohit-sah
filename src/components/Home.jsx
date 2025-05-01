import MovieList from "./MovieList";
import ViewHistory from "./ViewHistory";

const Home = () => (
  <div className="flex h-screen overflow-hidden">
    <div className="flex-1 overflow-y-auto">
      <MovieList />
    </div>
    <div className="w-80 overflow-y-auto ">
      <ViewHistory />
    </div>
  </div>
);

export default Home;
