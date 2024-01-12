import {
    alpha,
    Box,
    styled
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import CSPopcorn from "./CSPopcorn.tsx";

const RatingCircle = styled(Box)`
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid black;
    right: -10px;
    top: 0;
    color: ${grey[100]};
    font-weight: bolder;
`;

interface CSRatingProps {
    voteAverage: number;
    width?: string;
}

const PopcornRating: React.FC<CSRatingProps> = ({
    voteAverage,
    width = "45px"
}) => {
    const displayedRating = Math.floor(voteAverage * 10);
    const ratingColor = displayedRating < 60 ?
        "rgba(236,122,39,0.7)" : displayedRating < 80 ?
            "rgba(255,132,232,0.7)" : "rgba(76,67,212,0.7)";
    
    const popcornStyle = {
        width: width,
        fillcolor1: alpha(ratingColor, .75),
        fillcolor2: alpha(ratingColor, .6),
        fillcolor3: alpha(ratingColor, .75),
        fillcolor4: alpha(ratingColor, .75)
    };
    
    return (
        <Box
            position="relative"
            width="fit-content"
        >
            <CSPopcorn {...popcornStyle}/>
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