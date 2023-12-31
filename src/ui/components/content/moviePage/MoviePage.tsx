import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Movie from "../../../../models/movie";
import Video from "../../../../models/video";
import {
    getMovieRecommendationsPath,
    getSimilarMoviesPath,
    retrieveCredits,
    retrieveMovie,
    retrieveMovies,
    retrieveMovieTrailers
} from "../../../../utils/retrievalUtils";
import CastMemberRow from "../common/CastMemberRow";
import MovieSideBar from "./MovieSideBar";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";

const StyledMoviePage = styled(Stack)`
    justify-content: center;
    text-align: center;
`;

const moviePageLoader = async (movieId: string | undefined) => {
    const movie = await retrieveMovie(movieId);
    if (movie) {
        const credits = await retrieveCredits(movie.movieId);
        movie.credits = credits ? credits : [];
    }
    const movieTrailers = await retrieveMovieTrailers(movieId);
    const similarMovies = await retrieveMovies(getSimilarMoviesPath(movieId ?? ""));
    const recommendedMovies = await retrieveMovies(getMovieRecommendationsPath(movieId ?? ""));
    const trailer = movieTrailers.length > 0 ? movieTrailers[0] : null;
    return { movie, trailer, similarMovies, recommendedMovies };
};

interface LoaderData {
    movie: Movie;
    trailer: Video;
}

const MoviePage: React.FC = () => {
    const { movie: movie, trailer: trailer } = useLoaderData() as LoaderData;
    
    return (
        <>
            {movie && <StyledMoviePage
                className="full"
                key={movie.movieId}>
                <MovieTitleDisplay
                    key={movie.movieId}
                    movie={movie}
                />
                {movie.credits.length > 0 && <CastMemberRow
                    castMembers={movie.credits}
                    movieId={movie.movieId}
                />}
                <Stack
                    flexDirection={{
                        xs: "column",
                        md: "row"
                    }}
                    alignItems="center"
                    justifyContent="space-evenly"
                    padding={1}>
                    <TrailerDisplay
                        movie={movie}
                        trailer={trailer}
                    />
                    <MovieSideBar movie={movie}/>
                </Stack>
            </StyledMoviePage>}
        </>
    );
};

export { moviePageLoader };
export default MoviePage;