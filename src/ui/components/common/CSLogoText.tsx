import CSText from "@assets/cinesplain_text_logo.svg?react";
import {
    alpha,
    styled
} from "@mui/material";
import React, { SVGProps } from "react";

const StyledCSText = styled(CSText)<CSTextProps>`
    .cls-cine {
        fill: ${({ theme, color }) => color ? color : alpha(theme.palette.text.primary, .9)};
    }
`;

interface CSTextProps extends SVGProps<any> {
    color?: string;
}

const CSLogoText: React.FC<CSTextProps> = (props) => {
    return (
        <StyledCSText {...props} />
    );
};

export default CSLogoText;
