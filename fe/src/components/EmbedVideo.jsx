import React from "react";
import { CiPlay1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const EmbedVideo = ({ movie, ep, server }) => {

  const navigate = useNavigate();

  return (
    <div
      className="trailer flex flex-col w-full h-full items-center justify-center"
      style={{ aspectRatio: "16/9" }}
    >
      <iframe
        className=" top-0 left-0 w-[95%] h-[95%]"
        src={movie?.episodes[server]?.server_data[ep]?.link_embed}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="embedYt"
      />

      <div className="text-white mt-5 w-full px-5">
        {movie.episodes.map((sv, index) => (
          <p className={`${index == server ? "bg-gray-600" : "bg-[rgb(15,20,22)]"} m-2 py-2 px-2 flex items-center rounded-md hover:scale-101 transition-all 
                          duration-200 cursor-pointer hover:bg-gray-800`}
              onClick={() => {navigate(`/${movie.movie.slug}/${ep}/${index}`)}}>
            {index != server ? (
              <CiPlay1 />
            ) : (
              <img className="w-[20px]" src="/playing.gif" />
            )}
            &nbsp;{sv.server_name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EmbedVideo;
