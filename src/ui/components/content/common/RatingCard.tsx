import {
    Card,
    styled
} from "@mui/material";
import React from "react";
import Movie from "../../../../types/movie.ts";
import CSRatingDisplay from "./CSRatingDisplay.tsx";
import ImdbRatingDisplay from "./ImdbRatingDisplay.tsx";
import MetascoreDisplay from "./MetascoreDisplay.tsx";
import RottenTomatoesDisplay from "./RottenTomatoesDisplay.tsx";

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em;
    background-color: #00000030;
    border: solid 1px black;
`;

interface RatingCardProps {
    movie: Movie;
}

const RatingCard: React.FC<RatingCardProps> = ({
    movie
}) => (
    <StyledCard>
        {movie.voteAverage && <CSRatingDisplay voteAverage={movie.voteAverage}/>}
        {movie.rottenTomatoesScore && <RottenTomatoesDisplay rottenTomatoesScore={movie.rottenTomatoesScore}/>}
        {movie.imdbRating && <ImdbRatingDisplay imdbRating={movie.imdbRating}/>}
        {movie.metaScore && <MetascoreDisplay metaScore={movie.metaScore}/>}
    </StyledCard>
);

export default RatingCard;