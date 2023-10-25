import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedDate } from "../../../utils/formatUtils";

interface ReleaseDateDisplayProps {
    releaseDate: string;
    sx?: SxProps<Theme>;
}

const ReleaseDateDisplay: React.FC<ReleaseDateDisplayProps> = ({ releaseDate, sx }) => {
    return (
        <>
            <StandardTypography
                variant={"h6"}
                sx={sx}>{getFormattedDate(releaseDate)}
            </StandardTypography>
        </>
    );
};

export default ReleaseDateDisplay;