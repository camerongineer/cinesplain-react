import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Credits from "../../../../types/credits.ts";
import Movie from "../../../../types/movie.ts";
import Video from "../../../../types/video.ts";
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

const moviePageLoader = async (movieId: string) => {
    const movie = await retrieveMovie(movieId);
    if (!movie) {
        throw new Error("This page doesn't not exist.");
    }
    const credits = await retrieveCredits(movieId);
    const movieTrailers = await retrieveMovieTrailers(movieId);
    const similarMovies = await retrieveMovies(getSimilarMoviesPath(movieId));
    const recommendations = await retrieveMovies(getMovieRecommendationsPath(movieId));
    const trailer = movieTrailers && movieTrailers.length > 0 ? movieTrailers[0] : null;
    return { movie, credits, trailer, similarMovies, recommendations };
};

interface LoaderData {
    movie: Movie;
    credits: Credits;
    trailer: Video;
    similarMovies: Movie[];
    recommendations: Movie[];
}

const MoviePage: React.FC = () => {
    const { movie, credits, trailer, recommendations } = useLoaderData() as LoaderData;
    const filteredRecommendedMovies = recommendations.filter(movie => movie.backdropPath);
    return (
        <>
            {movie && <StyledMoviePage
                className="full"
                key={movie.id}
            >
                <MovieTitleDisplay
                    key={movie.id}
                    movie={movie}
                    director={undefined}
                />
                {credits && credits.cast.length > 0 && <CastMemberRow castMembers={credits.cast}/>}
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