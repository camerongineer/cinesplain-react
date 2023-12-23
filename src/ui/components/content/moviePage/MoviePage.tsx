import { useLoaderData } from "react-router-dom";
import { retrieveCredits, retrieveMovie } from "../../../../utils/retrievalUtils";
import Movie from "../../../../models/movie";
import React from "react";
import { Stack, styled } from "@mui/material";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";
import MovieSideBar from "./MovieSideBar";
import CastMemberRow from "../common/CastMemberRow";

const StyledMoviePage = styled(Stack)`
    justify-content: center;
`;

const loader = async (movieId: string | undefined) => {
    const movie = await retrieveMovie(movieId);
    if (movie) {
        const credits = await retrieveCredits(movie.movieId);
        movie.credits = credits ? credits : [];
    }
    return movie;
};

const MoviePage: React.FC = () => {
    const movie = useLoaderData() as Movie;
    
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
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    padding={1}>
                    {movie.videos.length > 0 && <Stack
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        flex={{
                            md: 2,
                            lg: 3
                        }}>
                        
                        <TrailerDisplay
                            movie={movie}
                            sx={{
                                width: "95%",
                                aspectRatio: "16/9"
                            }}/>
                    </Stack>}
                    <Stack
                        flex={{
                            md: 1,
                            lg: 1
                        }}
                        justifyContent="center"
                        padding={1}
                        marginX={1}>
                        <MovieSideBar movie={movie}/>
                    </Stack>
                </Stack>
            </StyledMoviePage>}
        </>
    );
};

export { loader };
export default MoviePage;