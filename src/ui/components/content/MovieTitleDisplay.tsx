import React, { useEffect, useState } from "react";
import { Button, Grid, Rating, styled } from "@mui/material";
import MovieCard from "./MovieCard";
import { StandardTypography } from "../../styles/Typography";
import { getFormattedDate } from "../../../utils/formatUtils";
import Movie from "../../../models/movie";
import { getBackdropPath } from "../../../utils/retrievalUtils";

interface MovieTitleDisplayProps {
    movie: Movie | null
}

const StyledGrid = styled(Grid)(({ theme }) => ({
    backgroundSize: "cover",
    backgroundPosition: "center right",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    minHeight: "500px",
    transition: `opacity ${theme.transitions.duration.short}ms ease-in-out`
}));

const MovieTitleDisplay: React.FC<MovieTitleDisplayProps> = ({ movie,  }) => {
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
        backgroundImg.onload = () => {
            setBackgroundImageLoaded(true);
        };
    }, [backgroundImage]);
    
    useEffect(() => {
        if (movie) {
            setBackgroundImage(getBackdropPath(movie.backdropPath));
            console.log(movie);
        }
    }, [movie]);
    
    const backgroundStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        opacity: !backgroundImageLoaded || !movie?.posterPath ? 0 : 1,
    };
    
    return (
        <StyledGrid container padding={1} sx={backgroundStyle}>
            
            <Grid item xs={12}></Grid>
            <Grid item xs={2}> </Grid>
            <Grid item xs={3} display={"flex"} justifyItems={"center"} alignItems={"center"}>
                {movie &&
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
        
        </StyledGrid>
    );
};

export default MovieTitleDisplay;