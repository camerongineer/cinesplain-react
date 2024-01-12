import Popcorn from "@assets/cinesplain_popcorn.svg?react";
import { styled } from "@mui/material";
import React from "react";

interface StyledPopcornProps {
    width: string;
    fillcolor1?: string;
    fillcolor2?: string;
    fillcolor3?: string;
    fillcolor4?: string;
}

const StyledPopcorn = styled(Popcorn)<StyledPopcornProps>`
    width: ${({ width }) => width};

    .cls4 {
        fill: ${({ fillcolor1 }) => fillcolor1 || ""};
    }

    .cls5 {
        fill: ${({ fillcolor2 }) => fillcolor2 || ""};
    }

    .cls9 {
        fill: ${({ fillcolor3 }) => fillcolor3 || ""};
    }

    .cls10 {
        fill: ${({ fillcolor4 }) => fillcolor4 || ""};
    }
`;

interface CSPopcornProps extends StyledPopcornProps {}

const CSPopcorn: React.FC<CSPopcornProps> = (props) => {
    return (
        <StyledPopcorn {...props} />
    );
};

export default CSPopcorn;
