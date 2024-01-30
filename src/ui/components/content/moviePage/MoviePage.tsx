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
import {
    getRecommendedMoviesPath,
    retrieveCredits,
    retrieveMovie,
    retrieveMovies,
    retrieveOmdbMovieDetails
} from "../../../../api/moviesApi.ts";
import Credits from "../../../../types/credits.ts";
import Movie from "../../../../types/movie.ts";
import OmdbMovieDetails from "../../../../types/OmdbMovieDetails.ts";
import Video from "../../../../types/video.ts";
import { getNumericId } from "../../../../utils/formatUtils.ts";
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
        const movie = await retrieveMovie(getNumericId(movieId ?? ""));
        if (!movie) {
            throw new Error("This page doesn't not exist.");
        }
        const credits = await retrieveCredits(movie.id);
        const trailer = movie.trailer;
        let recommendations = await retrieveMovies(getRecommendedMoviesPath(movie.id));
        recommendations = recommendations?.filter((movie: { backdropPath: string; }) => movie.backdropPath) ?? null;
        return { movie, credits, trailer, recommendations };
    }
});

const omdbQuery = (imdbId: string) => ({
    queryKey: ["moviePageOmdb", imdbId],
    queryFn: async () => retrieveOmdbMovieDetails(imdbId)
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
    recommendations: Movie[];
}

const MoviePage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof personPageLoader>>>;
    const params = useParams();
    const { data: imdbData } = useQuery({ ...moviePageQuery(params.movieId), initialData });
    const { movie, credits, trailer, recommendations } = imdbData as LoaderData;
    const { data: omdbData } = useQuery({ ...omdbQuery(movie.imdbId) });
    const omdbDetails = omdbData as OmdbMovieDetails;
    
    const director = credits?.crew.find(crewMember => crewMember.name === omdbDetails?.director);
    
    return (
        <>
            {movie && <StyledMoviePage
                className="full"
                key={movie.id}
            >
                <MovieTitleDisplay
                    key={movie.id}
                    movie={movie}
                    omdbDetails={omdbDetails}
                    director={director}
                />
                {credits && !!credits?.cast?.length && <CastMemberRow castMembers={credits.cast}/>}
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
                    <MovieSideBar
                        movie={movie}
                        omdbDetails={omdbDetails}
                    />
                </Stack>
                {!!recommendations?.length && <MovieRecommendations recommendedMovies={recommendations}/>}
            </StyledMoviePage>}
        </>
    );
};

export { moviePageLoader };
export default MoviePage;