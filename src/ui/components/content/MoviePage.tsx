import { useLocation, useParams } from "react-router-dom";
import { retrieveMovie } from "../../../utils/retrievalUtils";
import Movie from "../../../models/movie";
import React, { useEffect, useState } from "react";
import { Box,  styled, useTheme } from "@mui/material";
import { StandardTypography } from "../../styles/Typography";
import TrailerCard from "./TrailerCard";
import MovieTitleDisplay from "./MovieTitleDisplay";

const StyledMoviePage = styled(Box)(({ theme }) => ({
    width: theme.breakpoints.values.xl,
    justifyContent: "center",
    height: "100%",
    fontSize: "calc(10px + 2vmin)",
    alignSelf: "self-start",
    color: "white"
}));

interface MoviePageProps {
    loadedMovie: Movie | null;
}

const MoviePage: React.FC<MoviePageProps> = ({ loadedMovie }) => {
    const theme = useTheme();
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(loadedMovie);
    
    useEffect(() => {
        if (!loadedMovie) {
            (async () => {
                try {
                    setMovie(await retrieveMovie(movieId));
                } catch (error) {
                    console.error(error);
                    setMovie(null);
                }
            })();
        }
    }, [movieId]);
    
    return (
        <StyledMoviePage key={location.pathname}>
            <MovieTitleDisplay key={movie?.movieId} movie={movie}/>
            <Box flexDirection={"column"} sx={{ backgroundColor: theme.palette.background.paper }} padding={4}
                 height={"100vh"}>
                {movie && <TrailerCard movie={movie} sx={{ width: "800px", height: "450px" }}/>}
                <StandardTypography variant={"h4"} paddingTop={2} paddingBottom={1}
                                    color={"black"}>Overview</StandardTypography>
                <StandardTypography variant={"h6"} paddingBottom={5}
                                    color={"black"}>{movie?.overview}</StandardTypography>
            </Box>
        </StyledMoviePage>
    );
    
};

export default MoviePage;