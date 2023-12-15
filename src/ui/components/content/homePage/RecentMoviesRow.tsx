import React from "react";
import Movie from "../../../../models/movie";
import OuterCarousel from "../../common/OuterCarousel";
import { ImageList, ImageListItem, ImageListItemBar, styled, Typography, useTheme } from "@mui/material";
import { getImagePath } from "../../../../utils/retrievalUtils";
import { Link } from "react-router-dom";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";

const StyledImageList = styled(ImageList)`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    margin: 10px;
    background-size: cover;
    background-position: center;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }
`;

interface RecentMoviesRowProps {
    movies: Movie[];
}

const RecentMoviesRow: React.FC<RecentMoviesRowProps> = ({ movies }) => {
    const randomMovie = useRandomMovie(movies, 20000);
    const [movieBackdrop, movieBackdropLoading] = useMovieBackdrop(randomMovie);
    const theme = useTheme();
    
    const backdropStyle = {
        alignItems: "end",
        minHeight: "600px",
        width: "100%",
        opacity: movieBackdropLoading ? 0 : 1,
        transition: `opacity ${theme.transitions.duration.short}ms ease-in-out`
    };
    
    return (
        <OverlaidImageBox sx={backdropStyle}
                          backgroundImageUrl={movieBackdrop}
                          imageAlt={`${randomMovie?.movieTitle} backdrop`}
                          imageGrayScalePercentage={75}
                          overlayColor={"#000000"}
                          borderRadius={"0"}>
            <Typography color={theme.palette.getContrastText(theme.palette.common.black)}
                        width={"fit-content"}
                        variant={"h5"}
                        fontWeight={"bolder"}
                        paddingTop={"20%"}
                        zIndex={2}
                        mr={3}>
                Now In Theaters
            </Typography>
            <OuterCarousel sx={{ paddingBottom: "20px" }}>
                <StyledImageList gap={20}>
                    {movies.map(movie => (
                        <Link to={`/movies/${movie.movieId}`} key={movie.movieId}>
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
                                <img
                                    src={getImagePath(movie.backdropPath, BACKDROP_SIZE.MD_W780)}
                                    alt={movie.movieTitle}
                                />
                                <ImageListItemBar
                                    title={movie.movieTitle}
                                    subtitle={<span>{getFormattedDisplayedDate(movie.releaseDate)}</span>}
                                    position="bottom"
                                />
                            </ImageListItem>
                        </Link>
                    ))}
                </StyledImageList>
            </OuterCarousel>
        
        </OverlaidImageBox>
    );
};

export default RecentMoviesRow;