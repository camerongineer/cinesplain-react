import React from "react";
import { Stack, styled } from "@mui/material";
import OuterCarousel from "../../common/OuterCarousel";
import Movie from "../../../../models/movie";
import { Link } from "react-router-dom";
import MovieCard from "../moviePage/MovieCard";
import { StandardTypography } from "../../../styles/Typography";

const StyledStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  justify-content: start;
`;

interface MovieSearchRowProps {
    movies: Movie[];
    onModalEvent: () => void;
    invalidQueryPrompt: boolean;
}

const MovieSearchRow: React.FC<MovieSearchRowProps> = ({ movies, onModalEvent, invalidQueryPrompt }) => {
    return (
        <>
            {movies.length > 0 && <OuterCarousel sx={{ height: "inherit" }}>
                <StyledStack>
                    {movies.length > 0 && movies.slice(0, 20).map(movie => {
                        return (
                            <Link key={movie.movieId} to={`/movies/${movie.movieId}`} onClick={onModalEvent}>
                                <MovieCard key={movie.movieId}
                                           movie={movie}
                                           sx={{
                                               height: "auto",
                                               width: {xs: "26vw", sm: "18vw", md: "15vw", lg: "12vw"},
                                               minWidth: "100px",
                                               cursor: "pointer",
                                               margin: "10px"
                                           }}
                                           onHover={() => {}}
                                           isExpandable={true}/>
                            </Link>);
                    })}
                    {invalidQueryPrompt && movies.length === 0 &&
                        <StandardTypography variant={"h2"}>No movie data available.</StandardTypography>}
                </StyledStack>
            </OuterCarousel>}
        </>
    );
};

export default MovieSearchRow;