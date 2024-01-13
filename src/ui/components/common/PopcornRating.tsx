import {
    Box,
    styled
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { getCSRatingColor } from "../../../utils/ratingUtils.ts";
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
    const ratingColor = getCSRatingColor(voteAverage);
    
    return (
        <Box
            position="relative"
            width="fit-content"
        >
            <CSPopcorn
                width={width}
                ratingColor={ratingColor}
            />
            <RatingCircle
                className="center"
                bgcolor={ratingColor}
            >
                {voteAverage}
            </RatingCircle>
        </Box>
    );
};

export default PopcornRating;