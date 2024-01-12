import CinesplainPopcorn from "@assets/cinesplain_popcorn.svg?react";
import {
    Box,
    styled
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const RatingCircle = styled(Box)`
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid black;
    left: 25px;
    bottom: 15px;
    color: ${grey[100]};
    font-weight: bolder;
`;

const StyledCinesplainPopcorn = styled(CinesplainPopcorn)`
    width: 45px;
`;

interface CSRatingProps {
    voteAverage: number;
}

const PopcornRating: React.FC<CSRatingProps> = ({
    voteAverage
}) => {
    const displayedRating = Math.floor(voteAverage * 10);
    const ratingColor = displayedRating < 60 ?
        "rgba(236,122,39,0.7)" : displayedRating < 80 ?
            "rgba(255,132,232,0.7)" : "rgba(76,67,212,0.7)";
    
    return (
        <Box
            position="relative"
            width="fit-content"
        >
            <StyledCinesplainPopcorn/>
            <RatingCircle
                className="center"
                bgcolor={ratingColor}
            >
                {displayedRating}
            </RatingCircle>
        </Box>
    );
};

export default PopcornRating;