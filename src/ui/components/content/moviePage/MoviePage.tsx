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
import MovieRecommendations from "./MovieRecommendations";
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
    } else {
        throw new Error("This page doesn't not exist.");
    }
    const movieTrailers = await retrieveMovieTrailers(movieId);
    const similarMovies = await retrieveMovies(getSimilarMoviesPath(movieId ?? ""));
    const recommendations = await retrieveMovies(getMovieRecommendationsPath(movieId ?? ""));
    const trailer = movieTrailers.length > 0 ? movieTrailers[0] : null;
    return { movie, trailer, similarMovies, recommendations };
};

interface LoaderData {
    movie: Movie;
    trailer: Video;
    similarMovies: Movie[];
    recommendations: Movie[];
}

const MoviePage: React.FC = () => {
    const { movie, trailer, recommendations } = useLoaderData() as LoaderData;
    const filteredRecommendedMovies = recommendations.filter(movie => movie.backdropPath);
    
    return (
        <>
            {movie && <StyledMoviePage
                className="full"
                key={movie.movieId}
            >
                <MovieTitleDisplay
                    key={movie.movieId}
                    movie={movie}
                />
                {movie.credits.length > 0 && <CastMemberRow castMembers={movie.credits}/>}
                <Stack
                    flexDirection={{
                        xs: "column",
                        md: "row"
                    }}
                    alignItems="center"
                    justifyContent="space-evenly"
                    padding={1}
                >
                    <TrailerDisplay
                        movie={movie}
                        trailer={trailer}
                    />
                    <MovieSideBar movie={movie}/>
                </Stack>
                {recommendations.length > 0 && <MovieRecommendations recommendedMovies={filteredRecommendedMovies}/>}
            </StyledMoviePage>}
        </>
    );
};

export { moviePageLoader };
export default MoviePage;