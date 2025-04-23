import * as React from "react";
import { FaEye, FaFireAlt, FaStar } from "react-icons/fa";
import { MovieContext } from "../context/MovieProvider";

const TopMovies = () => {
  const { movies } = React.useContext(MovieContext);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (movies && movies.length > 0) {
      const mv = [...movies].sort((a, b) => b.movie.view - a.movie.view);
      setFilteredMovies(mv);
      setLoading(false);
    }
  }, [movies]);

  return (
    <div className="bg-[rgb(15,20,22)] px-4 pt-3 rounded-md">
      <ul className="flex text-white justify-evenly">
        <li className="flex items-center">
          Hot <FaFireAlt className="text-red-600" />
        </li>
        <li>Tv/Series</li>
        <li>Movie</li>
      </ul>

      {loading ? (
        <>Loading...</>
      ) : (
        <ul className="py-1">
          {filteredMovies.slice(0, 12).map((movie) => [
            <li
              key={movie.movie.slug}
              className="rounded-md overflow-hidden my-4 flex group cursor-pointer"
            >
              <div className="w-3/5">
                <img src={movie.movie.poster_url} />
              </div>
              <div className="w-3/5 md:w-2/3 bg-gray-800 text-white p-4 flex flex-col justify-between group">
                <h3 className="text-base font-semibold truncate group-hover:text-cyan-400 transition-colors duration-200">
                  {movie.movie.origin_name}
                </h3>
                <p className="flex items-center mt-2 text-sm text-gray-300">
                  <FaEye className="mr-1" />
                  {movie.movie.view} {movie.movie.view > 1 ? "views" : "view"}
                </p>
                <p className="flex items-center mt-1 text-sm text-gray-300">
                  <FaStar className="text-yellow-500 mr-1" />
                  {Math.round(movie.movie.tmdb.vote_average)}/10
                </p>
              </div>
            </li>,
          ])}
        </ul>
      )}
    </div>
  );
};

export default TopMovies;
