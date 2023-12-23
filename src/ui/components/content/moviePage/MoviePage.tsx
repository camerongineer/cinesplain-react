import { useLoaderData } from "react-router-dom";
import { retrieveCredits, retrieveMovie, retrieveMovieTrailers } from "../../../../utils/retrievalUtils";
import Movie from "../../../../models/movie";
import React from "react";
import { Stack, styled } from "@mui/material";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";
import MovieSideBar from "./MovieSideBar";
import CastMemberRow from "../common/CastMemberRow";
import Video from "../../../../models/video";

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
    const trailer = movieTrailers.length > 0 ? movieTrailers[0] : null;
    return { movie, trailer };
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