import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import MovieProvider from "./context/MovieProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCarousel from "./components/MovieCarousel";

const App = () => {
  return (
    <MovieProvider>
      <RouterProvider router={routes} />
    </MovieProvider>
  );
};

export default App;
