import React from "react";
import { Box, Grid, Rating, styled, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import Movie from "../../../../models/movie";
import TitleDisplay from "../common/TitleDisplay";
import ReleaseDateDisplay from "../common/ReleaseDateDisplay";
import GenreDisplay from "../common/GenreDisplay";
import RuntimeDisplay from "../common/RuntimeDisplay";
import LogoDisplay from "../common/LogoDisplay";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";

const StyledGrid = styled(Grid)`
  width: 100%;
  padding: 5% 0;
  transition: ${props => `opacity ${props.theme.transitions.duration.short}ms ease-in-out`};
  color: ${props => props.theme.palette.getContrastText("rgba(0, 0, 0, 0.4)")};
`;

interface MovieTitleDisplayProps {
    movie: Movie | null;
}

const MovieTitleDisplay: React.FC<MovieTitleDisplayProps> = ({ movie }) => {
    const [movieBackdrop, movieBackdropLoading] = useMovieBackdrop(movie);
    
    const backgroundStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${movieBackdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "top left",
        opacity: !movieBackdropLoading || !movie?.posterPath ? 1 : 0
    };
    
    return (
        movie &&
        <StyledGrid container
                    padding={2}
                    maxHeight={{ xs: "93vh", sm: "auto" }}
                    sx={backgroundStyle}>
            <Grid item
                  xs={0}
                  sm={1}/>
            <Grid item
                  xs={12}
                  sm={4}>
                <Box style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <MovieCard
                        sx={{
                            height: "auto",
                            width: "auto",
                            maxHeight: "100%",
                            maxWidth: "250px",
                            minWidth: 120
                        }}
                        movie={movie}
                        onHover={() => {}}
                        isExpandable={false}
                    />
                </Box>
            </Grid>
            <Grid item
                  xs={0}
                  sm={1}/>
            <Grid item
                  xs={12}
                  sm={5}
                  p={{ xs: 3, sm: 0 }}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}>
                {movie.images.logos.length > 0 && <LogoDisplay images={movie.images}/>}
                {movie.images.logos.length === 0 && <TitleDisplay title={movie.movieTitle}/>}
                <Box sx={{ mb: 1 }}
                     display={"flex"}
                     flexDirection={"row"}>
                    {movie.releaseDate && <ReleaseDateDisplay releaseDate={movie.releaseDate}/>}
                    {movie.runtime > 0 &&
                        <>
                            <Typography>&nbsp;&nbsp;•&nbsp;&nbsp;</Typography>
                            <RuntimeDisplay runtime={movie.runtime}/>
                        </>}
                </Box>
                {movie.voteCount >= 20 &&
                    <>
                        <Rating name="read-only"
                                precision={0.5}
                                size="medium"
                                value={Math.max(movie.voteAverage / 2, 0.5)}
                                readOnly/>
                    </>
                }
                <GenreDisplay genres={movie.genres}/>
            </Grid>
            <Grid item
                  xs={0}
                  sm={1}/>
        </StyledGrid>
    );
};

export default MovieTitleDisplay;