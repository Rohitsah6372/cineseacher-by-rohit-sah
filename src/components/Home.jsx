import Header from "./commons/Header";
import MovieList from "./MovieList";
import ViewHistory from "./ViewHistory";

const Home = () => (
  <div className="flex h-screen flex-col overflow-hidden">
    <Header />
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto pt-8 shadow-xl">
        <MovieList />
      </div>
      <div className="w-84 overflow-y-auto border-l border-gray-200 bg-white">
        <ViewHistory />
      </div>
    </div>
  </div>
);

export default Home;
