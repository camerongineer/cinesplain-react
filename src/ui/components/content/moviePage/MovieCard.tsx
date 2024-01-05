import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardProps,
    Rating,
    styled,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { POSTER_SIZE } from "../../../../constants/ImageSizes";
import Movie from "../../../../types/movie.ts";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import { getImagePath } from "../../../../utils/retrievalUtils";

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

export interface MovieCardProps extends CardProps {
    movie: Movie;
    posterSize?: string;
    onHover: (backdropPath: string) => void;
    isExpandable: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
    movie,
    posterSize = POSTER_SIZE.LG_W780,
    onHover,
    isExpandable,
    ...props
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
            variant="outlined"
            style={{
                animation: `Card-Wobble infinite ${movie.voteAverage
                    ? (4 * (movie.voteAverage / 10))
                    : 3}s alternate`,
                visibility: imageLoaded || !movie.posterPath ? "visible" : "hidden",
                opacity: imageLoaded || !movie.posterPath ? 1 : 0
            }}
            onMouseEnter={handleMouseHovered}
            onMouseLeave={handleMouseNotHovered}
            {...props}
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
                    }}>
                    <CardHeader
                        title={<Typography variant={"h6"}>{movie.title}</Typography>}
                        subheader={
                            <>
                                {movie.releaseDate &&
                                    <Typography>
                                        {getFormattedDisplayedDate(movie.releaseDate)}
                                    </Typography>}
                                {movie.voteAverage > 0 &&
                                    <>
                                        <Rating
                                            style={{ marginTop: 4 }}
                                            precision={0.5}
                                            size="small"
                                            value={movie.voteAverage / 2}
                                            readOnly
                                        />
                                    </>
                                }
                            </>
                            
                        }
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="text.secondary">
                            {`${movie.overview.substring(0, 200)}${movie.overview.length > 200 ? "..." : ""}`}
                        </Typography>
                    </CardContent>
                </Box>
            }
        </StyledCard>
    );
};

export default MovieCard;