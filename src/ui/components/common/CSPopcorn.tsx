import Popcorn from "@assets/cinesplain_popcorn.svg?react";
import {
    alpha,
    styled
} from "@mui/material";
import React, { SVGProps } from "react";

const StyledPopcorn = styled(Popcorn)<CSPopcornProps>`
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

interface CSPopcornProps extends SVGProps<any> {
    color?: string;
}

const CSPopcorn: React.FC<CSPopcornProps> = (props) => {
    return (
        <StyledPopcorn {...props} />
    );
};

export default CSPopcorn;
