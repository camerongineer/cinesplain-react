import CSText from "@assets/cinesplain_text_logo.svg?react";
import {
    alpha,
    styled
} from "@mui/material";
import React from "react";

interface StyledCSTextProps {
    width: string;
    color?: string;
}

const StyledCSText = styled(CSText)<StyledCSTextProps>`
    width: ${({ width }) => width};

    .cls-cine {
        fill: ${({ theme, color }) => color ? color : alpha(theme.palette.text.primary, .9)};
    }
`;

interface CSPopcornProps extends StyledCSTextProps {}

const CSPopcorn: React.FC<CSPopcornProps> = (props) => {
    return (
        <StyledCSText {...props} />
    );
};

export default CSPopcorn;
