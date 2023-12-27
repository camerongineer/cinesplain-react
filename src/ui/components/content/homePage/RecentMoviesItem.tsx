import React from "react";
import { Box, ImageListItem, ImageListItemBar, useTheme } from "@mui/material";
import { getImagePath } from "../../../../utils/retrievalUtils";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import Movie from "../../../../models/movie";

interface RecentMoviesItemProps {
    movie: Movie;
}

const RecentMoviesItem: React.FC<RecentMoviesItemProps> = ({ movie }) => {
    const theme = useTheme();
    return (
        <ImageListItem
            sx={{
                scrollSnapAlign: "center",
                width: {
                    xs: theme.breakpoints.values.md / 2,
                    md: theme.breakpoints.values.lg / 2,
                    lg: theme.breakpoints.values.xl / 3.5
                },
                zIndex: 2,
                borderRadius: "10px"
            }}>
            <Box
                component="img"
                src={getImagePath(movie.backdropPath, BACKDROP_SIZE.MD_W780)}
                alt={movie.movieTitle}
            />
            <ImageListItemBar
                title={movie.movieTitle}
                subtitle={getFormattedDisplayedDate(movie.releaseDate)}
                position="bottom"
            />
        </ImageListItem>
    );
};

export default RecentMoviesItem;