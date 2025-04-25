import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/${movie.movie.slug}`);
      }}
      className="group relative rounded-lg min-w-50 min-h-80 overflow-hidden cursor-pointer
                     shadow-lg transition-transform duration-300 hover:scale-102"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:brightness-75"
        style={{ backgroundImage: `url(${movie.movie.thumb_url})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />

      <div className="absolute inset-0 flex items-center justify-center transform translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <FaRegPlayCircle className="text-6xl text-white hover:text-red-500 transition-colors duration-300 cursor-pointer" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="text-[rgb(190,175,38)]">
          <h3 className="font-bold text-[16px] truncate">{movie.movie.name}</h3>
          <p className="text-[12px] text-gray-300 truncate">
            {movie.movie.origin_name} ({movie.movie.year})
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
