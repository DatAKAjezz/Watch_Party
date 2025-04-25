import * as React from "react";
import { FaEye, FaFireAlt, FaStar } from "react-icons/fa";
import { MovieContext } from "../context/MovieProvider";

const TopMovies = () => {
  const { movies } = React.useContext(MovieContext);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filterType, setFilterType] = React.useState(0);

  React.useEffect(() => {
    if (movies && movies.length > 0) {
      let mv = [...movies].sort((a, b) => b.movie.view - a.movie.view);

      if (filterType === 1) {
        mv = mv.filter(movie =>
          ["tv", "series"].includes(movie.movie.type)
        );
      } else if (filterType === 2) {
        mv = mv.filter(movie => movie.movie.type === "single");
      }

      setFilteredMovies(mv);
      setLoading(false);
    }
  }, [movies, filterType]);

  if (loading) return <div className="text-white px-4 py-4">Loading...</div>;

  return (
    <div className="bg-[rgb(15,20,22)] px-4 pt-4 pb-6 rounded-xl shadow-lg">
      {/* Filter Tabs */}
      <ul className="flex text-white justify-evenly mb-4 text-sm font-semibold">
        {[
          { label: "Hot", icon: <FaFireAlt className="ml-1 text-red-500" />, id: 0 },
          { label: "Tv/Series", icon: null, id: 1 },
          { label: "Single", icon: null, id: 2 },
        ].map(tab => (
          <li
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`cursor-pointer px-3 py-1 rounded-full transition-colors duration-200 ${
              filterType === tab.id
                ? "bg-cyan-600 text-white"
                : "hover:bg-cyan-800 text-gray-300"
            }`}
          >
            <span className="flex items-center gap-1">
              {tab.label} {tab.icon}
            </span>
          </li>
        ))}
      </ul>

      {/* Movie List */}
      <div className="flex flex-col gap-4">
        {filteredMovies.slice(0, 10).map((movieObj, index) => {
          const { movie } = movieObj;

          return (
            <div
              key={index}
              className="cursor-pointer flex bg-[rgb(25,30,35)] rounded-lg overflow-hidden shadow-md hover:scale-[1.01] transition-transform"
            >
              {/* Poster */}
              <img
                src={movie.thumb_url}
                alt={movie.title}
                className="min-w-28 h-40 object-cover"
              />

              {/* Info */}
              <div className="p-3 text-white flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-lg font-semibold mb-1">{movie.name}</h2>
                  <p className="text-sm text-gray-300 mb-2 flex items-center">
                    <FaStar className='text-yellow-500'/>&nbsp;{Math.round(movie.tmdb.vote_average)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaEye className="text-cyan-500" /> {movie.view} views
                  </span>
                  <span className="uppercase bg-cyan-700 text-white px-2 py-0.5 rounded text-xs">
                    {movie.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopMovies;
