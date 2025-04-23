import * as React from "react";
import axios from "axios";
import { getMovieDetails } from "../helpers/MovieHelper";
import Slider from "react-slick";
import { TvMinimalPlay } from "lucide-react";
import { FaBeer, FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";

const MovieCarousel = () => {
  const [newMovies, setNewMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUpdateMovie = async () => {
    try {
      const response = await axios.get(
        "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1"
      );
      const data = await Promise.all(
        response.data.items.map((movie) => getMovieDetails(movie.slug))
      );
      setNewMovies(data);
      console.log("New Movies: ", data);
      setLoading(false);
    } catch (err) {
      console.log("Error at fetchUpdateMovie: ", err);
    }
  };

  React.useEffect(() => {
    fetchUpdateMovie();
  }, []);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (loading) return <p className="text-center">Loading carousel...</p>;

  return (
    <div className="px-4 py-8 bg-[rgb(15,20,22)] rounded-md">
      <Slider {...settings}>
        {newMovies.slice(0, 5).map((movie) => (
          <div key={movie._id} className="px-2">
            <div className="bg-white shadow rounded overflow-hidden relative group cursor-pointer">
              <img
                src={movie.poster_url}
                alt={movie.name}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "16/9" }}
              />

              {/* Animated Icon */}
              <div
                className="absolute top-1/2 left-1/2 transform 
                          -translate-x-1/2 translate-y-1/2 opacity-0
                          transition-all duration-300 ease-in-out 
                          group-hover:opacity-100 group-hover:-translate-y-1/2"
              >
                <FaRegPlayCircle className="text-4xl text-white transition-colors duration-300 group-hover:text-red-500" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
