import { useLocation, useParams } from "react-router-dom";
import { retrieveCredits, retrieveMovie } from "../../../../utils/retrievalUtils";
import Movie from "../../../../models/movie";
import React, { useEffect, useState } from "react";
import { Box, Stack, styled, useTheme } from "@mui/material";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";
import MovieSideBar from "./MovieSideBar";

const StyledMoviePage = styled(Box)`
  width: ${props => props.theme.breakpoints.values.xl}px;
  justify-content: center;
  align-self: self-start;
  height: 100%;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.palette.text.primary};
`;

interface MoviePageProps {
    loadedMovie: Movie | null;
}

const MoviePage: React.FC<MoviePageProps> = ({ loadedMovie }) => {
    const theme = useTheme();
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(loadedMovie);
    
    useEffect(() => {
        if (!loadedMovie) {
            (async () => {
                try {
                    setMovie(await retrieveMovie(movieId));
                } catch (error) {
                    console.error(error);
                    setMovie(null);
                }
            })();
        }
    }, [movieId]);
    
    useEffect(() => {
        if (movie) {
            (async () => {
                try {
                    const credits = await retrieveCredits(movie.movieId);
                    movie.credits = credits ? credits : [];
                    console.log(movie.credits);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [movie]);
    
    return (
        movie && <StyledMoviePage key={location.pathname}>
            <MovieTitleDisplay key={movie.movieId} movie={movie}/>
            <Stack flexDirection={{ xs: "column", md: "row" }}
                   sx={{ backgroundColor: theme.palette.background.paper }}
                   padding={2}>
                {movie.videos.length > 0 && <Box flexDirection={"column"}
                                                 justifyContent={"start"}
                                                 flex={{ md: 2, lg: 3 }}>
                    <TrailerDisplay movie={movie}
                                    sx={{ width: "100%", aspectRatio: "16/9" }}/>
                </Box>}
                <Box flexDirection={"column"}
                     flex={{ md: 1, lg: 1 }}
                     padding={1}
                     ml={1}
                     mr={1}
                     pl={{ md: 3 }}>
                    <MovieSideBar movie={movie}/>
                </Box>
            </Stack>
        </StyledMoviePage>
    );
};

export default MoviePage;