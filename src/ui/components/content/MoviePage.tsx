import { useLocation, useParams } from "react-router-dom";
import { getBackdropPath, retrieveMovie } from "../../../utils/retrievalUtils";
import Movie from "../../../models/movie";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Box, Button, Grid, Rating, styled, useTheme } from "@mui/material";
import { StandardTypography } from "../../styles/Typography";
import { getFormattedDate } from "../../../utils/formatUtils";
import TrailerCard from "./TrailerCard";

const StyledMoviePage = styled(Box)(({ theme }) => ({
    width: theme.breakpoints.values.xl,
    height: "100%",
    fontSize: "calc(10px + 2vmin)",
    alignSelf: "self-start",
    color: "white",
}));

interface MoviePageProps {
    loadedMovie: Movie | null;
}

const MoviePage: React.FC<MoviePageProps> = ({ loadedMovie }) => {
    const theme = useTheme();
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(loadedMovie);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState<boolean>(false);
    
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
    
    useEffect(() => {
        if (movie) {
            setBackgroundImage(getBackdropPath(movie.backdropPath));
            console.log(movie);
        }
    }, [movie]);
    
    useEffect(() => {
        if (movie && !movie.backdropPath) {
            setBackgroundImageLoaded(true);
        }
        if (!backgroundImage) return;
        const backgroundImageUrl = backgroundImage;
        const backgroundImg = new Image();
        backgroundImg.src = backgroundImageUrl;
        backgroundImg.onload = () => {
            setBackgroundImageLoaded(true);
        };
    }, [backgroundImage]);
    
    const overlayColor = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
    const overlayImage = `url(${backgroundImage})`;
    
    const overlayStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        height: "50vh",
        minHeight: "500px",
        opacity: !backgroundImageLoaded || !movie?.posterPath ? 0 : 1,
        transition: `opacity ${theme.transitions.duration.standard} ease-in-out`
    };
    
    return (
        <StyledMoviePage key={location.pathname}>
            <Box display={"flex"} flexDirection={"column"} height={"100%"} justifyContent={"center"}>
                <Grid container padding={1} sx={overlayStyle}>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={2}> </Grid>
                        <Grid item xs={3} display={"flex"} justifyItems={"center"} alignItems={"center"}>
                            {(loadedMovie && movie || !loadedMovie && movieId && movie) &&
                                <MovieCard style={{
                                    height: "auto",
                                    width: "auto",
                                    maxHeight: "100%",
                                    maxWidth: "300px",
                                    minWidth: 120
                                }} movie={movie} onHover={() => {}}
                                           isExpandable={false}/>
                            }
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={4} display={"flex"} flexDirection={"column"} alignItems={"center"}
                              justifyContent={"center"}>
                            <Grid item xs={2}/>
                            <StandardTypography variant={"h3"}>{movie?.movieTitle}</StandardTypography>
                            <StandardTypography variant={"h5"}>{`Released: ${getFormattedDate(
                                movie?.releaseDate)}`}</StandardTypography>
                            <StandardTypography>
                                {movie?.genres.map((genre) => {
                                    return <Button variant={"contained"} size={"small"} style={{ margin: 10 }}
                                                   key={genre.name}>{genre.name}</Button>;
                                })}
                            </StandardTypography>
                            {movie && movie.voteCount > 3 &&
                                <Rating name="read-only" precision={0.5} size="medium"
                                        value={Math.max(movie.voteAverage / 2, 0.5)} readOnly/>}
                        
                        </Grid>
                        <Grid item xs={2}/>
                        
                        <Grid item xs={12}></Grid>

                </Grid>
                <Box flexDirection={"column"} sx={{ backgroundColor: theme.palette.background.paper }} padding={4}
                     height={"100vh"}>
                    {movie && <TrailerCard movie={movie} sx={{ width: "800px", height: "450px" }}/>}
                    <StandardTypography variant={"h4"} paddingTop={2} paddingBottom={1}
                                        color={"black"}>Overview</StandardTypography>
                    <StandardTypography variant={"h6"} paddingBottom={5}
                                        color={"black"}>{movie?.overview}</StandardTypography>
                </Box>
            </Box>
        </StyledMoviePage>
    );
    
};

export default MoviePage;