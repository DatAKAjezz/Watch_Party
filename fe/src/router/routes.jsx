import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home"
import Login from '../pages/Login'
import Signup from "../pages/Signup";
import MovieDetails from "../pages/MovieDetails";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <NotFound/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/:slug",
        element: <MovieDetails/>
    },
    {
        path: "/:slug/:ep/:server",
        element: <MovieDetails/>
    }
])

export default routes
