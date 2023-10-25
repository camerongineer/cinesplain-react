import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface TitleDisplayProps {
    title: string;
    sx?: SxProps<Theme>;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ title, sx }) => (
    <>
        <StandardTypography variant={"h3"} sx={sx}>{title}</StandardTypography>
    </>
);

export default TitleDisplay;