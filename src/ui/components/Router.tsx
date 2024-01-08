import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Loading from "./common/Loading";
import NotFound from "./common/NotFound.tsx";
import HomePage, { homePageLoader } from "./content/homePage/HomePage";
import MoviePage, { moviePageLoader } from "./content/moviePage/MoviePage";
import PersonPage, { personPageLoader } from "./content/personPage/PersonPage.tsx";
import ReportPage, { reportPageLoader } from "./content/reportPage/ReportPage.tsx";
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
            }}
            errorElement={<NotFound/>}
        >
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
            <Route
                path="report"
                element={<ReportPage/>}
                loader={reportPageLoader}
                action={async ({ request, params }) => {
                    switch (request.method) {
                        case "POST": {
                            let formData = await request.formData();
                            let username = formData.get("username");
                            let title = formData.get("title");
                            let issue = formData.get("issue");
                            setTimeout(() => {
                            }, 2000);
                            return null;
                        }
                        case "DELETE": {
                            return null;
                        }
                        default: {
                            throw new Response("", { status: 405 });
                        }
                    }
                }}
            />
        </Route>
    )
);

const Router: React.FC = () => <RouterProvider
    router={router}
    fallbackElement={<Loading/>}
/>;

export default Router;