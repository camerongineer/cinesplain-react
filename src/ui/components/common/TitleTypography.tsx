import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface TitleTypographyProps {
    title: string;
    sx?: SxProps<Theme>;
}

const TitleTypography: React.FC<TitleTypographyProps> = ({ title, sx }) => (
    <>
        <StandardTypography variant={"h3"} sx={sx}>{title}</StandardTypography>
    </>
);

export default TitleTypography;