import * as React from "react";
import axios from "axios";
import { getMovieDetails } from "../helpers/MovieHelper";
import Slider from "react-slick";

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <div className="px-4 py-8">
      <Slider {...settings}>
        {newMovies.map((movie) => (
          <div key={movie._id} className="px-2">
            <div className="bg-white shadow rounded overflow-hidden">
              <img
                src={movie.poster_url}
                alt={movie.name}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-2">
                <h3 className="font-semibold text-sm truncate">
                  {movie.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {movie.origin_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
