import Popcorn from "@assets/cinesplain_popcorn.svg?react";
import {
    alpha,
    styled
} from "@mui/material";
import React from "react";

interface StyledPopcornProps {
    width: string;
    ratingColor?: string;
}

const StyledPopcorn = styled(Popcorn)<StyledPopcornProps>`
    width: ${({ width }) => width};

    .cls4 {
        fill: ${({ ratingColor }) => ratingColor ? alpha(ratingColor, .75) : ""};
    }

    .cls5 {
        fill: ${({ ratingColor }) => ratingColor ? alpha(ratingColor, .6) : ""};
    }

    .cls9 {
        fill: ${({ ratingColor }) => ratingColor ? alpha(ratingColor, .75) : ""};
    }

    .cls10 {
        fill: ${({ ratingColor }) => ratingColor ? alpha(ratingColor, .75) : ""};
    }
`;

interface CSPopcornProps extends StyledPopcornProps {}

const CSPopcorn: React.FC<CSPopcornProps> = (props) => {
    return (
        <StyledPopcorn {...props} />
    );
};

export default CSPopcorn;
