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
  min-width: 100%;
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
            {movies.length > 0 && <OuterCarousel sx={{ overflow: "auto", height: "inherit" }}>
                <StyledStack className={"full center"}>
                    {movies.length > 0 && movies.slice(0, 20).map(movie => {
                        return (
                            <Link key={movie.movieId} to={`/movies/${movie.movieId}`} onClick={onModalEvent}>
                                <MovieCard movie={movie}
                                           posterWidth={"w342"}
                                           sx={{
                                               height: "auto",
                                               width: { xs: "70vw", sm: "26vw", md: "20vw", lg: "15vw" },
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