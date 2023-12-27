import {
    ImageList,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import Movie from "../../../../models/movie";
import OuterCarousel from "../../common/OuterCarousel";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import RecentMoviesItem from "./RecentMoviesItem";

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
        width: "100%",
        opacity: movieBackdropLoading ? 0 : 1,
        transition: `opacity ${theme.transitions.duration.short}ms ease-in-out`
    };
    
    return (
        <OverlaidImageBox
            sx={backdropStyle}
            backgroundImageUrl={movieBackdrop}
            imageAlt={`${randomMovie?.movieTitle} backdrop`}
            imageGrayScalePercentage={75}
            overlayColor={"#000000"}
            borderRadius="0"
            bottomLabelText={randomMovie.movieTitle}
        >
            <Typography
                variant="h5"
                width="fit-content"
                color={theme.palette.getContrastText(theme.palette.common.black)}
                fontWeight="bolder"
                paddingTop="20%"
                zIndex={2}
                mr={3}
            >
                Now In Theaters
            </Typography>
            <OuterCarousel sx={{ paddingBottom: "20px" }}>
                <StyledImageList gap={20}>
                    {movies.map(movie => (
                        <Link
                            to={`/movies/${movie.movieId}`}
                            key={movie.movieId}
                        >
                            <RecentMoviesItem movie={movie}/>
                        </Link>
                    ))}
                </StyledImageList>
            </OuterCarousel>
        </OverlaidImageBox>
    );
};

export default RecentMoviesRow;