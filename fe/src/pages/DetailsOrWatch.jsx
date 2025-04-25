import React from "react";
import { FaStar } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import EmbedVideo from "../components/EmbedVideo";

const DetailsOrWatch = ({ details, ep, server }) => {

  return (
    <div className="flex px-4 py-4 w-full">
      {!(ep && server) ? (
        <>
          <img src={details.movie.thumb_url} className="w-2/10" />
          <div className="text-white w-8/10 p-2">
            <h1 className="text-[20px] font-bold">{details.movie.name}</h1>
            <p className="text-[12px] text-gray-400 italic">
              ({details.movie.origin_name} - {details.movie.year})
            </p>
            <div className="bg-blue-600 mt-2 w-fit px-3 py-2 text-white">
              {details.movie.episode_current} {details.movie.lang}
            </div>
            <hr className="w-full mt-2" />
            <div className="mt-2 flex">
              <div className="bg-gray-700 w-fit px-5 py-4">
                {details.movie.tmdb.vote_average}
              </div>
              <div className="px-2 pt-2">
                <div className="flex">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-[20px] mx-[2px] ${
                        index <= Math.floor(details.movie.tmdb.vote_average)
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                  ))}
                </div>
                <p className="flex items-center text-[12px] text-gray-400">
                  Vote: {details.movie.tmdb.vote_count} | <MdRemoveRedEye />:{" "}
                  {details.movie.view}
                </p>
              </div>
            </div>

            <hr className="w-full mt-2 mb-2" />

            <div className="text-[14px]">
              {details?.movie?.category?.map((_, i) => (
                <>
                  {_.name} {i < details?.movie.category.length - 1 ? "| " : ""}
                </>
              ))}
            </div>
          </div>
        </>
      ) : (
        <EmbedVideo ep={ep} server={server} movie={details ? details : null} />
      )}
    </div>
  );
};

export default DetailsOrWatch;
