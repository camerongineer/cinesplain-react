import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Rating,
    styled
} from "@mui/material";
import Movie from "../../../../models/movie";
import { StandardTypography } from "../../../styles/Typography";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import { SxProps } from "@mui/system";
import { getImagePath } from "../../../../utils/retrievalUtils";
import { POSTER_SIZE } from "../../../../constants/ImageSizes";

const StyledCard = styled(Card)`
  position: relative;
  background: ${props => props.theme.palette.background.paper};
  transition: height 2s ease-in-out, opacity ${props => props.theme.transitions.duration.complex}ms ease-in-out;
  @keyframes Card-Wobble {
    from {
      transform: rotate(-1deg);
    }
    to {
      transform: rotate(1deg);
    }
  }
`;

export interface MovieCardProps {
    movie: Movie;
    posterSize?: string;
    onHover: (backdropPath: string) => void;
    isExpandable: boolean;
    sx?: SxProps;
}

const MovieCard: React.FC<MovieCardProps> = ({
    movie,
    posterSize = POSTER_SIZE.LG_W780,
    onHover,
    isExpandable,
    sx
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const handleMouseHovered = () => {
        setIsHovered(true);
        onHover(movie.backdropPath);
    };
    
    const handleMouseNotHovered = () => {
        setIsHovered(false);
    };
    
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    
    return (
        <StyledCard
            key={movie.movieId}
            variant="outlined"
            style={{
                animation: `Card-Wobble infinite ${movie.voteAverage
                    ? (4 * (movie.voteAverage / 10))
                    : 3}s alternate`,
                visibility: imageLoaded || !movie.posterPath ? "visible" : "hidden",
                opacity: imageLoaded || !movie.posterPath ? 1 : 0
            }}
            sx={sx}
            onMouseEnter={handleMouseHovered}
            onMouseLeave={handleMouseNotHovered}
        >
            {movie.posterPath && (
                <CardMedia
                    component="img"
                    image={getImagePath(movie.posterPath, posterSize)}
                    alt="Movie Poster"
                    onLoad={handleImageLoad}
                />
            )}
            {isExpandable &&
                <Box
                    className="hover-content"
                    style={{
                        height: isHovered || !imageLoaded || !movie.posterPath
                            ? "auto"
                            : "0",
                        overflow: "hidden"
                    }}
                >
                    <CardHeader
                        title={<StandardTypography variant={"h6"}>{movie.movieTitle}</StandardTypography>}
                        subheader={
                            <>
                                {movie.releaseDate &&
                                    <StandardTypography>{getFormattedDisplayedDate(
                                        movie.releaseDate)}</StandardTypography>}
                                {movie.voteAverage > 0 &&
                                    <>
                                        <Rating style={{ marginTop: 4 }} precision={0.5} size="small"
                                                value={movie.voteAverage / 2} readOnly/>
                                    </>
                                }
                            </>
                            
                        }
                    />
                    <CardContent>
                        <StandardTypography variant="body2" color="text.secondary">
                            {`${movie.overview.substring(0, 200)}${movie.overview.length > 200 ? "..." : ""}`}
                        </StandardTypography>
                    </CardContent>
                </Box>
            }
        </StyledCard>
    );
};

export default MovieCard;