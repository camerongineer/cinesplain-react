import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface TaglineDisplayProps {
    tagline: string;
    sx?: SxProps<Theme>;
}

const TaglineDisplay: React.FC<TaglineDisplayProps> = ({ tagline, sx }) => (
    <>
        <StandardTypography variant={"subtitle1"} sx={sx}>{tagline}</StandardTypography>
    </>
);

export default TaglineDisplay;