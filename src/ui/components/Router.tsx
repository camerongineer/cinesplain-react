import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomePage, { loader as homePageLoader } from "./content/homePage/HomePage";
import MoviePage, { loader as moviePageLoader } from "./content/moviePage/MoviePage";
import Layout from "./Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route id="root" element={<Layout/>} loader={homePageLoader}>
            <Route
                index
                element={<HomePage/>}
            />
            <Route
                path="movies/:movieId"
                element={<MoviePage/>}
                loader={async ({ params }) => await moviePageLoader(params.movieId)}
            />
        </Route>
    )
);

const Router: React.FC = () => <RouterProvider router={router}/>;

export default Router;