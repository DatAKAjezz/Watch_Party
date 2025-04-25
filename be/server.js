import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetchMoviesOnce from './src/helpers/helper.js';
import authRoutes from './src/routes/authRoutes.js';
import connectDB from './src/config/db.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
let cachedMovies = await fetchMoviesOnce();

// console.log(cachedMovies);

const two_day_interval = 168 * 60 * 60 * 1000;

setInterval(async () => {
  console.log("Auto-refetching movies...");
  cachedMovies = await fetchMoviesOnce();
}, two_day_interval);

app.get("/api/movies", async (req, res) => {
  console.log("Fetching movies");
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

const PORT = process.env.PORT || 5000;

app.use((req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});