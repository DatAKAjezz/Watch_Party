import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

let cachedMovies = [];

const axiosInstance = axios.create({
  timeout: 10000,
});

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
      }
  
      cachedMovies = freshMovies; 
      console.log("Fetched movies successfully!");
    } catch (error) {
      console.log("Error at fetchMoviesOnce: ", error);
    }
  };
  

fetchMoviesOnce();

const two_day_interval = 168 * 60 * 60 * 1000;

setInterval(async () => {
    console.log("Auto-refetching movies...")
    cachedMovies = [];
    await fetchMoviesOnce();
}, two_day_interval)

app.get("/api/movies", async (req, res) => {
  console.log("Fetching movies!!");
  if (cachedMovies.length > 0) {
    res.json({
      status: "success",
      message: "Movie fetched successfully!",
      data: cachedMovies,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Movies data is not available yet.",
    });
  }
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
