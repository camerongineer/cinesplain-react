import Popcorn from "@assets/cinesplain_popcorn.svg?react";
import {
    alpha,
    styled
} from "@mui/material";
import React from "react";

interface StyledPopcornProps {
    width: string;
    color?: string;
}

const StyledPopcorn = styled(Popcorn)<StyledPopcornProps>`
    width: ${({ width }) => width};

    .cls4 {
        fill: ${({ color }) => color ? alpha(color, .75) : ""};
    }

    .cls5 {
        fill: ${({ color }) => color ? alpha(color, .6) : ""};
    }

    .cls9 {
        fill: ${({ color }) => color ? alpha(color, .75) : ""};
    }

    .cls10 {
        fill: ${({ color }) => color ? alpha(color, .75) : ""};
    }
`;

interface CSPopcornProps extends StyledPopcornProps {}

const CSPopcorn: React.FC<CSPopcornProps> = (props) => {
    return (
        <StyledPopcorn {...props} />
    );
};

export default CSPopcorn;
