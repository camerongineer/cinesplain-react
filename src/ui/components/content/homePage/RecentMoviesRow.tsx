import {
    Typography,
    useTheme
} from "@mui/material";
import React from "react";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import Movie from "../../../../models/movie";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import BackdropImageListRow from "../common/BackdropImageListRow";

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
            <BackdropImageListRow movies={movies}/>
        </OverlaidImageBox>
    );
};

export default RecentMoviesRow;