import * as React from "react";
import Header from "../components/Header";
import MovieCarousel from "../components/MovieCarousel";
import TopMovies from "../components/TopMovies";
import { MovieContext } from "../context/MovieProvider";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { movies, loading } = React.useContext(MovieContext);

  const [filteredMovies, setFilteredMovies] = React.useState([]);

  React.useEffect(() => {
    setFilteredMovies([...movies].sort((a, b) => b.movie.view - a.movie.view));
    console.log("Movie from home: ", filteredMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="">
      <Header />
      <div className="flex px-4 gap-4 mt-5">
        <div className="w-7/10 flex-1">
          <MovieCarousel />

          <div className="bg-[rgb(15,20,22)] px-4 my-4 py-2 rounded-md">
            <div className="flex justify-between h-12 bg-black rounded-xl overflow-hidden items-center mt-4">
              <p className="text-white px-4 transition-all duration-200 hover:text-cyan-500 hover:font-bold cursor-pointer">
                Xem thêm
              </p>
              <p className="bg-[rgb(207,10,10)] h-full flex items-center px-5">
                Phim lẻ
              </p>
            </div>

            <div className="grid grid-cols-4 px-6 pt-4 gap-5">
              {filteredMovies
                .filter((movie) => movie.movie.type === "single")
                .slice(0, 8)
                .map((movie) => (
                  <MovieCard key={movie.movie.slug} movie={movie} />
                ))}
            </div>
          </div>

          <div className="bg-[rgb(15,20,22)] px-4 my-4 py-2 rounded-md">
            <div className="flex justify-between h-12 bg-black rounded-xl overflow-hidden items-center mt-4">
              <p className="text-white px-4 transition-all duration-200 hover:text-cyan-500 hover:font-bold cursor-pointer">
                Xem thêm
              </p>
              <p className="bg-[rgb(207,10,10)] h-full flex items-center px-5">
                Phim bộ
              </p>
            </div>

            <div className="grid grid-cols-4 px-6 pt-4 gap-5">
              {filteredMovies
                .filter(
                  (movie) =>
                    movie.movie.type === "series" || movie.movie.type === "tv"
                )
                .slice(0, 8)
                .map((movie) => (
                  <MovieCard key={movie.movie.slug} movie={movie} />
                ))}
            </div>
          </div>

          <div className="bg-[rgb(15,20,22)] px-4 my-4 py-2 rounded-md">
            <div className="flex justify-between h-12 bg-black rounded-xl overflow-hidden items-center mt-4">
              <p className="text-white px-4 transition-all duration-200 hover:text-cyan-500 hover:font-bold cursor-pointer">
                Xem thêm
              </p>
              <p className="bg-[rgb(207,10,10)] h-full flex items-center px-5">
                Hoạt hình
              </p>
            </div>

            <div className="grid grid-cols-4 px-6 pt-4 gap-5">
              {filteredMovies
                .filter(
                  (movie) =>
                   movie.movie.type === "hoathinh"
                )
                .slice(0, 8)
                .map((movie) => (
                  <MovieCard key={movie.movie.slug} movie={movie} />
                ))}
            </div>
          </div>
        </div>
        <div className="w-3/10 max-w-[30%]">
          <TopMovies />
        </div>
      </div>
    </div>
  );
};

export default Home;
