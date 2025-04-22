import * as React from "react";
import axios from "axios";

export const MovieContext = React.createContext();

const MovieProvider = ({children}) => {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/movies");
      setMovies(res.data.data || []);
      console.log("Length: ", res.data.data.length);
    } catch (err) {
      console.error("Failed to fetch movies: ", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return(
    <MovieContext.Provider value={{movies, loading}}>
        {children}
    </MovieContext.Provider>
  )
};

export default MovieProvider;
