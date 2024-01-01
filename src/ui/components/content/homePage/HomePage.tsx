import {
    Grid,
    Stack
} from "@mui/material";
import { purple } from "@mui/material/colors";
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
            <RecentMoviesRow movies={recentMovies.filter(movie => movie.backdropPath)}/>
            <Hero/>
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
                        backgroundOverlayColor={"#B5179E"}
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
                        movies={lovedMovies.slice(0, 10)}
                        backgroundOverlayColor={"#F72585"}
                        backdropInterval={27500}
                        labelText="Most Loved"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    padding={1}
                >
                    <RatingList
                        movies={hatedMovies.slice(0, 10)}
                        backgroundOverlayColor={purple["800"]}
                        backdropInterval={40000}
                        labelText="Most Hated"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    padding={1}
                >
                    <RatingList
                        movies={classicMovies}
                        backgroundOverlayColor={"#4CC9F0"}
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