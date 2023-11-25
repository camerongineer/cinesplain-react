import React, { useEffect, useState } from "react";
import { Stack, styled } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import MoviePage from "./moviePage/MoviePage";
import useLoadedMoviesState from "../../../hooks/UseLoadedMoviesState";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getPopularMoviesPath, getUpcomingMoviesPath
} from "../../../utils/retrievalUtils";

const StyledStack = styled(Stack)`
  max-width: ${props => props.theme.breakpoints.values.xl}px;
  text-align: center;
  flex-direction: row;
  justify-content: space-evenly;
  transition-delay: .5s;
  color: ${props => props.theme.palette.text.primary};
`;

const MainContent: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [recentMovies, recentMoviesLoading] = useLoadedMoviesState(getNowPlayingMoviesPath());
    const [popularMovies, popularMoviesLoading] = useLoadedMoviesState(getPopularMoviesPath(1));
    const [lovedMovies, lovedMoviesLoading] = useLoadedMoviesState(getMostLovedMoviesPath());
    const [hatedMovies, hatedMoviesLoading] = useLoadedMoviesState(getMostHatedMoviesPath());
    const [classicMovies, classicMoviesLoading] = useLoadedMoviesState(getClassicMoviesPath());
    const [upcomingMovies, upcomingMoviesLoading] = useLoadedMoviesState(getUpcomingMoviesPath());
    
    useEffect(() => {
        if (
            !recentMoviesLoading &&
            !popularMoviesLoading &&
            !lovedMoviesLoading &&
            !hatedMoviesLoading &&
            !classicMoviesLoading &&
            !upcomingMoviesLoading
        ) {
            setLoading(false);
        }
    }, [recentMovies, popularMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies]);
    
    return (
        <StyledStack className={"full center"}>
            <Routes>
                <Route path="/"
                       element={<HomePage loading={loading}
                                          recentMovies={recentMovies}
                                          popularMovies={popularMovies}
                                          lovedMovies={lovedMovies}
                                          hatedMovies={hatedMovies}
                                          classicMovies={classicMovies}
                                          upcomingMovies={upcomingMovies}/>}/>
                <Route path="/movies/:movieId"
                       element={<MoviePage/>}
                />
            </Routes>
        </StyledStack>
    );
};

export default MainContent;