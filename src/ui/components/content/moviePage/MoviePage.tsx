import {
    Stack,
    styled
} from "@mui/material";
import {
    QueryClient,
    useQuery
} from "@tanstack/react-query";
import React from "react";
import {
    Params,
    useLoaderData,
    useParams
} from "react-router-dom";
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
import { personPageLoader } from "../personPage/PersonPage.tsx";
import MovieRecommendations from "./MovieRecommendations";
import MovieSideBar from "./MovieSideBar";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";

const StyledMoviePage = styled(Stack)`
    justify-content: center;
    text-align: center;
`;

const moviePageQuery = (movieId: string | undefined) => ({
    queryKey: ["moviePage", movieId],
    queryFn: async (): Promise<LoaderData | null> => {
        const movie = await retrieveMovie(movieId ?? "");
        if (!movie) {
            throw new Error("This page doesn't not exist.");
        }
        const credits = await retrieveCredits(movieId ?? "");
        const movieTrailers = await retrieveMovieTrailers(movieId ?? "");
        const similarMovies = await retrieveMovies(getSimilarMoviesPath(movieId ?? ""));
        const trailer = movieTrailers && movieTrailers.length > 0 ? movieTrailers[0] : null;
        let recommendations = await retrieveMovies(getMovieRecommendationsPath(movieId ?? ""));
        recommendations = recommendations?.filter((movie: { backdropPath: string; }) => movie.backdropPath) ?? null;
        return { movie, credits, trailer, similarMovies, recommendations };
    }
});

const moviePageLoader = (queryClient: QueryClient) => async ({ params }: { params: Params }) => {
    const movieId = params.movieId;
    return queryClient.getQueryData(moviePageQuery(movieId).queryKey) ??
        await queryClient.fetchQuery(moviePageQuery(movieId));
};

interface LoaderData {
    movie: Movie;
    credits: Credits | null;
    trailer: Video | null;
    similarMovies: Movie[];
    recommendations: Movie[];
}

const MoviePage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof personPageLoader>>>;
    const params = useParams();
    const { data } = useQuery({ ...moviePageQuery(params.movieId), initialData });
    const { movie, credits, trailer, recommendations } = data as LoaderData;
    
    const director = credits?.crew.find(crewMember => crewMember.name === movie.director);
    return (
        <>
            {movie && <StyledMoviePage
                className="full"
                key={movie.id}
            >
                <MovieTitleDisplay
                    key={movie.id}
                    movie={movie}
                    director={director}
                />
                {credits && !!credits.cast.length && <CastMemberRow castMembers={credits.cast}/>}
                <Stack
                    flexDirection={{
                        lg: "row"
                    }}
                    alignItems={{
                        xs: "center",
                        lg: "start"
                    }}
                    justifyContent="space-evenly"
                    padding={1}
                >
                    {trailer && <TrailerDisplay
                        movie={movie}
                        trailer={trailer}
                    />}
                    <MovieSideBar movie={movie}/>
                </Stack>
                {!!recommendations.length && <MovieRecommendations recommendedMovies={recommendations}/>}
            </StyledMoviePage>}
        </>
    );
};

export { moviePageLoader };
export default MoviePage;