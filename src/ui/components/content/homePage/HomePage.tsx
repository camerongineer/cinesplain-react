import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Stack } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import RecentMoviesRow from "./RecentMoviesRow";
import RatingList from "./RatingList";
import { purple } from "@mui/material/colors";
import Hero from "./Hero";
import Movie from "../../../../models/movie";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../../../../utils/retrievalUtils";

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
        upcomingMovies,
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
        <Stack className="full center">
            <RecentMoviesRow movies={recentMovies.filter(movie => movie.backdropPath)}/>
            <Hero/>
            <Masonry
                className="full"
                columns={{
                    xs: 1,
                    md: 2,
                    lg: 3
                }}
                spacing={4}
                sx={{
                    paddingTop: 2,
                    margin: 0
                }}>
                
                <RatingList
                    movies={upcomingMovies.slice(0, 10)}
                    backgroundOverlayColor={"#B5179E"}
                    backdropInterval={25000}
                    labelText="Upcoming"
                />
                <RatingList
                    movies={lovedMovies.slice(0, 10)}
                    backgroundOverlayColor={"#F72585"}
                    backdropInterval={27500}
                    labelText="Most Loved"
                />
                
                <RatingList
                    movies={hatedMovies.slice(0, 10)}
                    backgroundOverlayColor={purple["800"]}
                    backdropInterval={40000}
                    labelText="Most Hated"
                />
                <RatingList
                    movies={classicMovies}
                    backgroundOverlayColor={"#4CC9F0"}
                    backdropInterval={22000}
                    labelText="Classics"
                />
            </Masonry>
        </Stack>
    );
};

export { homePageLoader };
export default HomePage;