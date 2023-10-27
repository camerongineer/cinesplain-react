import React, { useEffect, useState } from "react";
import { Box, Grid, Rating, styled, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import Movie from "../../../../models/movie";
import { getBackdropPath } from "../../../../utils/retrievalUtils";
import TitleDisplay from "../../common/TitleDisplay";
import ReleaseDateDisplay from "../../common/ReleaseDateDisplay";
import GenreDisplay from "../../common/GenreDisplay";
import RuntimeDisplay from "../../common/RuntimeDisplay";

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
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        if (movie && !movie.backdropPath) {
            setBackgroundImageLoaded(true);
        }
        if (!backgroundImage) return;
        const backgroundImageUrl = backgroundImage;
        const backgroundImg = new Image();
        backgroundImg.src = backgroundImageUrl;
        backgroundImg.alt = "Movie Backdrop";
        backgroundImg.onload = () => {
            setBackgroundImageLoaded(true);
        };
    }, [backgroundImage]);
    
    useEffect(() => {
        if (movie && movie.backdropPath) {
            setBackgroundImage(getBackdropPath(movie.backdropPath));
        }
    }, [movie]);
    
    const backgroundStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center left",
        opacity: !backgroundImageLoaded || !movie?.posterPath ? 0 : 1
    };
    
    return (
        movie &&
        <StyledGrid container
                    padding={2}
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
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <MovieCard
                        style={{
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
                <TitleDisplay title={movie.movieTitle}/>
                <Box sx={{ mb: 4 }}
                     display={"flex"}
                     flexDirection={"row"}>
                    <ReleaseDateDisplay releaseDate={movie.releaseDate}/>
                    <Typography>&nbsp;&nbsp;•&nbsp;&nbsp;</Typography>
                    <RuntimeDisplay runtime={movie.runtime}/>
                </Box>
                <GenreDisplay genres={movie.genres}/>
                {movie.voteCount > 3 &&
                    <Rating name="read-only"
                            precision={0.5}
                            size="medium"
                            value={Math.max(movie.voteAverage / 2, 0.5)}
                            readOnly/>}
            </Grid>
            <Grid item
                  xs={0}
                  sm={1}/>
        </StyledGrid>
    );
};

export default MovieTitleDisplay;