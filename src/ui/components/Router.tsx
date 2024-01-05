import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Loading from "./common/Loading";
import HomePage, { homePageLoader } from "./content/homePage/HomePage";
import MoviePage, { moviePageLoader } from "./content/moviePage/MoviePage";
import PersonPage, { personPageLoader } from "./content/personPage/PersonPage.tsx";
import { headerLoader } from "./header/Header";
import Layout from "./Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            id="root"
            element={<Layout/>}
            loader={async () => {
                const headerData = await headerLoader();
                const homePageData = await homePageLoader();
                return { headerData, ...homePageData };
            }}>
            <Route
                index
                element={<HomePage/>}
            />
            <Route
                path="movies/:movieId"
                element={<MoviePage/>}
                loader={async ({ params }) => await moviePageLoader(params.movieId ?? "")}
            />
            <Route
                path="person/:personId"
                element={<PersonPage/>}
                loader={async ({ params }) => await personPageLoader(params.personId ?? "")}
            />
        </Route>
    )
);

const Router: React.FC = () => <RouterProvider
    router={router}
    fallbackElement={<Loading/>}
/>;

export default Router;