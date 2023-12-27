import {
    Box,
    ImageListItem,
    ImageListItemBar,
    styled,
    useTheme
} from "@mui/material";
import React from "react";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";
import Movie from "../../../../models/movie";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import { getImagePath } from "../../../../utils/retrievalUtils";

const StyledImageListItem = styled(ImageListItem)`
    scroll-snap-align: center;
    z-index: 2;

    &:hover {
        font-weight: 900;
    }

    &:hover > img {
        filter: saturate(150%);
    }
`;

interface RecentMoviesItemProps {
    movie: Movie;
}

const RecentMoviesItem: React.FC<RecentMoviesItemProps> = ({
    movie
}) => {
    const theme = useTheme();
    
    return (
        <StyledImageListItem
            sx={{
                width: {
                    xs: theme.breakpoints.values.md / 2,
                    md: theme.breakpoints.values.lg / 2,
                    lg: theme.breakpoints.values.xl / 3.5
                },
            }}
        >
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
        </StyledImageListItem>
    );
};

export default RecentMoviesItem;