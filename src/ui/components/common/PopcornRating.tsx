import React from "react";
import popcornRating from "../../images/popcorn_rating.png";
import { Box, styled } from "@mui/material";

const RatingCircle = styled(Box)`
  display: flex;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid black;
  left: 25px;
  bottom: 17px;
`;

interface CSRatingProps {
    voteAverage: number;
}

const PopcornRating: React.FC<CSRatingProps> = ({
    voteAverage
}) => {
    const displayedRating = Math.floor(voteAverage * 10);
    const ratingColor = displayedRating < 60 ?
        "rgba(81,75,20,0.7)" : displayedRating < 70 ?
            "rgba(59,118,31,0.7)" : "rgba(31,148,61,0.7)";
    
    return (
        <Box position={"relative"} width={"fit-content"}>
            <Box component={"img"}
                 position={"relative"}
                 height={"40px"}
                 src={popcornRating}
                 alt={displayedRating.toString()}/>
            <RatingCircle className={"center"} bgcolor={ratingColor}>{displayedRating}</RatingCircle>
        </Box>
    );
};

export default PopcornRating;