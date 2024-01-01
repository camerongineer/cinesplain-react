import {
    Card,
    CardMedia,
    CardProps,
    ImageListItem,
    ImageListItemBar,
    styled
} from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";
import Movie from "../../../../models/movie";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import { getImagePath } from "../../../../utils/retrievalUtils";

const StyledCard = styled(Card)`
    min-width: 150px;
    transition: opacity ${props => props.theme.transitions.duration.standard}ms ease-in-out;
    cursor: pointer;
    user-select: none;
    scroll-snap-align: start;
`;

const StyledImageListItem = styled(ImageListItem)`
    z-index: 1;

    &:hover {
        font-weight: 900;
    }

    &:hover > img {
        filter: saturate(150%);
    }
`;

interface BackdropImageListItemProps extends CardProps {
    movie: Movie;
    cardStyle?: SxProps;
}

const BackdropImageListItem: React.FC<BackdropImageListItemProps> = ({
    movie,
    cardStyle,
    ...props
}) => {
    const [loading, setLoading] = useState(true);
    
    return (
        <StyledCard
            elevation={5}
            sx={cardStyle}
            style={{ opacity: loading ? "0" : "1" }}
            {...props}
        >
            <StyledImageListItem>
                <CardMedia
                    component="img"
                    image={getImagePath(movie.backdropPath, BACKDROP_SIZE.MD_W780)}
                    alt={movie.movieTitle}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={() => setLoading(false)}
                />
                <ImageListItemBar
                    title={movie.movieTitle}
                    subtitle={getFormattedDisplayedDate(movie.releaseDate)}
                    position="bottom"
                />
            </StyledImageListItem>
        </StyledCard>
    );
};

export default BackdropImageListItem;