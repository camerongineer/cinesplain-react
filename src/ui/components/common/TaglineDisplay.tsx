import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";

interface TaglineDisplayProps {
    tagline: string;
    sx?: SxProps<Theme>;
}

const TaglineDisplay: React.FC<TaglineDisplayProps> = ({ tagline, sx }) => (
    <>
        <Typography variant={"subtitle1"} sx={sx}>{tagline}</Typography>
    </>
);

export default TaglineDisplay;