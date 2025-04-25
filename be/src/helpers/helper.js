import axiosInstance from "../config/API.js";

const getMovieDetails = async (slug) => {
  try {
    const response = await axiosInstance.get(`https://ophim1.com/phim/${slug}`);
    return response.data;
  } catch (error) {
    console.log(`Error fetching movie details for slug: ${slug} `);
    return null;
  }
};

const fetchMoviesOnce = async () => {
  let currentPage = 1;
  let hasMoreData = true;
  const freshMovies = [];

  try {
    while (hasMoreData) {
      console.log(`Fetched page: ${currentPage}`);
      const response = await axiosInstance.get(
        `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${currentPage}`
      );
      const movies = response.data.items || [];

      if (!movies.length) {
        hasMoreData = false;
        break;
      }

      const details = await Promise.all(
        movies.map(async (movie) => await getMovieDetails(movie.slug))
      );

      freshMovies.push(...details.filter((detail) => detail !== null));
      currentPage++;
      if (currentPage > 100) break;
    }
    console.log("Fetched movies successfully: " + freshMovies.length);
    return freshMovies;
  } catch (error) {
    console.log("Error at fetchMoviesOnce: ", error);
  }
};

export default fetchMoviesOnce;