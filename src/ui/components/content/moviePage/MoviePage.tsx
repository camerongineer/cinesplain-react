import { useLocation, useParams } from "react-router-dom";
import { retrieveCredits, retrieveMovie } from "../../../../utils/retrievalUtils";
import Movie from "../../../../models/movie";
import React, { useEffect, useState } from "react";
import { Box, Stack, styled } from "@mui/material";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";
import MovieSideBar from "./MovieSideBar";
import CastMemberRow from "../common/CastMemberRow";

const StyledMoviePage = styled(Stack)`
  width: 100%;
  justify-content: center;
  height: 100%;
  font-size: calc(10px + 2vmin);
  background: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.primary};
`;

interface MoviePageProps {
    loadedMovie?: Movie | null;
}

const MoviePage: React.FC<MoviePageProps> = ({ loadedMovie = null }) => {
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(loadedMovie);
    
    useEffect(() => {
        if (!loadedMovie) {
            (async () => {
                try {
                    const movieData = await retrieveMovie(movieId);
                    if (movieData === null) return null;
                    const credits = await retrieveCredits(movieData.movieId);
                    movieData.credits = credits ? credits : [];
                    console.log(movie);
                    setMovie(movieData);
                } catch (error) {
                    console.error(error);
                    setMovie(null);
                }
            })();
        }
    }, [movieId]);
    
    useEffect(() => {
        if (movie && !movie.credits) {
            (async () => {
                try {
                    const credits = await retrieveCredits(movie.movieId);
                    movie.credits = credits ? credits : [];
                    console.log(movie);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [movie]);
    
    return (
        <>
            {movie && <StyledMoviePage key={location.pathname}>
                <MovieTitleDisplay key={movie.movieId} movie={movie}/>
                {movie.credits.length > 0 && <CastMemberRow castMembers={movie.credits} movieId={movieId}/>}
                <Stack flexDirection={{ xs: "column", md: "row" }}
                       alignItems={"center"}
                       justifyContent={"space-evenly"}
                       padding={1}>
                    {movie.videos.length > 0 && <Box flexDirection={"column"}
                                                     justifyContent={"center"}
                                                     alignItems={"center"}
                                                     display={"flex"}
                                                     width={"100%"}
                                                     flex={{ md: 2, lg: 3 }}>
                        
                        <TrailerDisplay movie={movie}
                                        sx={{ width: "95%", aspectRatio: "16/9" }}/>
                    </Box>}
                    <Box flexDirection={"column"}
                         flex={{ md: 1, lg: 1 }}
                         justifyContent={"center"}
                         padding={1}
                         ml={1}
                         mr={1}>
                        <MovieSideBar movie={movie}/>
                    </Box>
                </Stack>
            </StyledMoviePage>}
        </>
    );
};

export default MoviePage;