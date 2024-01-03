import {
    Grid,
    Stack
} from "@mui/material";
import {
    blue,
    pink,
    purple,
    red
} from "@mui/material/colors";
import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import Movie from "../../../../models/movie";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../../../../utils/retrievalUtils";
import Hero from "./Hero";
import RatingList from "./RatingList";
import RecentMoviesRow from "./RecentMoviesRow";

const homePageLoader = async () => {
    const recentMovies = await retrieveMovies(getNowPlayingMoviesPath()) ?? [];
    const lovedMovies = await retrieveMovies(getMostLovedMoviesPath()) ?? [];
    const hatedMovies = await retrieveMovies(getMostHatedMoviesPath()) ?? [];
    const classicMovies = await retrieveMovies(getClassicMoviesPath()) ?? [];
    const upcomingMovies = await retrieveMovies(getUpcomingMoviesPath()) ?? [];
    return {
        recentMovies,
        lovedMovies,
        hatedMovies,
        classicMovies,
        upcomingMovies
    };
};

interface LoaderData {
    recentMovies: Movie[];
    lovedMovies: Movie[];
    hatedMovies: Movie[];
    classicMovies: Movie[];
    upcomingMovies: Movie[];
}

const HomePage: React.FC = () => {
    const {
        recentMovies,
        lovedMovies,
        hatedMovies,
        classicMovies,
        upcomingMovies
    } = useRouteLoaderData("root") as LoaderData;
    
    return (
        <Stack className="full">
            <Stack
                className="full"
                minHeight={{
                    xs: "calc(100dvh - 70px)",
                    md: "80vh"
                }}
            >
                <RecentMoviesRow movies={recentMovies.filter(movie => movie.backdropPath)}/>
                <Hero/>
            </Stack>
            <Grid
                container
                className="full"
                paddingTop={2}
                margin={0}
                spacing={0}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                    padding={1}
                >
                    <RatingList
                        movies={upcomingMovies.slice(0, 10)}
                        backgroundOverlayColor={blue["900"]}
                        backdropInterval={25000}
                        labelText="Upcoming"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    padding={1}
                >
                    <RatingList
                        movies={lovedMovies.slice(0, 8)}
                        backgroundOverlayColor={pink["900"]}
                        backdropInterval={27500}
                        labelText="Most Loved"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    padding={1}
                >
                    <RatingList
                        movies={hatedMovies.slice(0, 8)}
                        backgroundOverlayColor={red["900"]}
                        backdropInterval={40000}
                        labelText="Most Hated"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    padding={1}
                >
                    <RatingList
                        movies={classicMovies.slice(0, 12)}
                        backgroundOverlayColor={purple["900"]}
                        backdropInterval={22000}
                        labelText="Classics"
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};

export { homePageLoader };
export default HomePage;