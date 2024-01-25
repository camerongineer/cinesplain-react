import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import joinAction from "../../actions/joinAction.ts";
import Loading from "./common/Loading";
import NotFound from "./common/NotFound.tsx";
import HomePage, { homePageLoader } from "./content/homePage/HomePage";
import JoinPage, { joinPageLoader } from "./content/joinPage/JoinPage.tsx";
import LoginPage, { loginPageLoader } from "./content/loginPage/LoginPage.tsx";
import MoviePage, { moviePageLoader } from "./content/moviePage/MoviePage";
import PersonPage, { personPageLoader } from "./content/personPage/PersonPage.tsx";
import { headerLoader } from "./header/Header";
import Layout from "./Layout";

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 3600
            }
        }
    });

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            id="root"
            element={<Layout/>}
            errorElement={<NotFound/>}
            loader={headerLoader(queryClient)}
        >
            <Route
                index
                element={<HomePage/>}
                loader={homePageLoader(queryClient)}
            />
            <Route
                path="movies/:movieId"
                element={<MoviePage/>}
                loader={moviePageLoader(queryClient)}
            />
            <Route
                path="person/:personId"
                element={<PersonPage/>}
                loader={personPageLoader(queryClient)}
            />
            <Route
                path="login"
                element={<LoginPage/>}
                loader={loginPageLoader}
            />
            <Route
                path="join"
                element={<JoinPage/>}
                loader={joinPageLoader}
                action={joinAction}
            />
        </Route>
    )
);

const Router: React.FC = () =>
    <QueryClientProvider client={queryClient}>
        <RouterProvider
            router={router}
            fallbackElement={<Loading/>}
        />
    </QueryClientProvider>;

export default Router;