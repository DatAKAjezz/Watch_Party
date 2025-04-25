import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../helpers/MovieHelper";
import { useParams } from "react-router-dom";
import TopMovies from "./../components/TopMovies";
import Header from "./../components/Header";
import MovieInformation from "../components/MovieInformation";
import MovieCarousel from './../components/MovieCarousel';
import EmbedVideo from "../components/EmbedVideo";
import DetailsOrWatch from "./DetailsOrWatch";

const MovieDetails = () => {
  const { slug } = useParams();

  const [details, setDetails] = useState(null);
  const [type, setType] = useState(0);

  const {ep, server} = useParams();

  // console.log("EP and SERVER: " + ep + " " + server)

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDetails(slug);
      setDetails(data);
      if (data) console.log("Details: ", data);
    };
    getData();
  }, [slug]);

  return (
    details && (
      <div>
        <Header />
        <div className="flex px-4 gap-4 mt-5">
          <div className="w-7/10 bg-[rgb(15,20,22)] rounded-xl h-fit">
            
            <DetailsOrWatch ep={ep} server={server} details={details}/>

            <hr className="text-white mx-5 my-2" />

            <div className="pl-10 flex text-white">
              <div
                className="bg-red-600 w-fit px-4 py-3 rounded-sm hover:bg-red-700 cursor-pointer"
                onClick={() => {
                  setType(0);
                }}
              >
                Xem phim
              </div>

              <div
                className={`w-fit px-4 py-3 mx-2 rounded-sm ml-56 cursor-pointer ${type === 1 ? "bg-blue-600" : ""}`}
                onClick={() => {
                  setType(1);
                }}
              >
                Thông tin
              </div>
              <div
                className={`w-fit px-4 mx-2 py-3 rounded-sm cursor-pointer ${type === 2 ? "bg-blue-600" : ""}`}
                onClick={() => {
                  setType(2);
                }}
              >
                Diễn viên
              </div>
              <div
                className={`w-fit mx-2 px-4 py-3 rounded-sm cursor-pointer ${type === 3 ? "bg-blue-600" : ""}`}
                onClick={() => {
                  setType(3);
                }}
              >
                Trailer phim
              </div>
            </div>

            <hr className="text-white mx-5 my-2" />

            <MovieInformation ep={ep} movie={details} type={type} />

            <hr className="text-white mx-5 my-2" />

            <p className="text-white pl-5">Có thể bạn sẽ thích</p>
            
            <MovieCarousel/>

          </div>

          <div className="w-3/10 max-w-[30%]">
            <TopMovies />
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
