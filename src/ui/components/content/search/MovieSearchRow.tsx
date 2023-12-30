import {
    Stack,
    styled,
    Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Movie from "../../../../models/movie";
import OuterCarousel from "../../common/OuterCarousel";
import MovieCard from "../moviePage/MovieCard";

const StyledStack = styled(Stack)`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
    padding: 0 1em;

    & > * {
        flex-shrink: 0;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

interface MovieSearchRowProps {
    movies: Movie[];
    invalidQueryPrompt: boolean;
}

const MovieSearchRow: React.FC<MovieSearchRowProps> = ({
    movies,
    invalidQueryPrompt
}) => {
    return (
        <>
            {movies.length > 0 && <OuterCarousel sx={{
                position: "absolute",
                top: "50%",
                transform: "translate(0, -50%)",
                overflow: "auto",
                height: "inherit",
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }}>
                <StyledStack>
                    {movies.length > 0 && movies.slice(0, 20).map(movie => {
                        return (
                            <Link
                                key={movie.movieId}
                                to={`/movies/${movie.movieId}`}
                            >
                                <MovieCard
                                    key={movie.movieId}
                                    movie={movie}
                                    posterSize="w342"
                                    sx={{
                                        height: "auto",
                                        width: {
                                            xs: "200px",
                                            md: "300px"
                                        },
                                        cursor: "pointer",
                                        margin: "10px"
                                    }}
                                    onHover={() => {
                                    }}
                                    isExpandable={true}
                                />
                            </Link>);
                    })}
                    {invalidQueryPrompt && movies.length === 0 &&
                        <Typography variant={"h2"}>
                            No movie data available.
                        </Typography>}
                </StyledStack>
            </OuterCarousel>}
        </>
    );
};

export default MovieSearchRow;