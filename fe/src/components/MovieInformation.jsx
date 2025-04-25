import React from "react";
import { useNavigate } from "react-router-dom";

const MovieInformation = ({ type, movie, ep }) => {

  const navigate = useNavigate();

  return (
    <div className="text-white py-5 px-20">
      {type === 0 && (
        <div>
          <p>Chọn tập phim</p>
          <div className="flex gap-1 flex-wrap">
            {movie.episodes[0].server_data.map((episode, index) => (
              <p
                key={index}
                className={`${ep == index ? "bg-gray-600" : "bg-blue-500 "} text-[12px] px-3 py-2 cursor-pointer hover:bg-blue-600 w-fit font-bold`}
                onClick={() => {
                  navigate(`/${movie.movie.slug}/${index}/0`);
                }}
              >
                {episode.name}
              </p>
            ))}
          </div>
        </div>
      )}

      {type === 1 && (
        <div dangerouslySetInnerHTML={{ __html: movie.content }} />
      )}

      {type === 2 && <div>Lười làm...</div>}

      {type === 3 && <div>hello</div>}
    </div>
  );
};

export default MovieInformation;
