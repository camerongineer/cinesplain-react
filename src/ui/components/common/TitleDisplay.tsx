import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";

interface TitleDisplayProps {
    title: string;
    sx?: SxProps<Theme>;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ title, sx }) => (
    <>
        <Typography variant={"h3"} sx={sx}>{title}</Typography>
    </>
);

export default TitleDisplay;