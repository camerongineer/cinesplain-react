import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedDate } from "../../../utils/formatUtils";

interface ReleaseDateDisplayProps {
    releaseDate: string;
    includeLabel?: boolean;
    sx?: SxProps<Theme>;
}

const ReleaseDateDisplay: React.FC<ReleaseDateDisplayProps> = ({ releaseDate, includeLabel, sx }) => {
    const releaseLabelText = new Date() > new Date(releaseDate) ? "Released on" : "Releases on"
    return (
        <>
            <StandardTypography
                variant={"body1"}
                sx={sx}>{(includeLabel ? <b>{releaseLabelText}:&nbsp;</b> : "")}{getFormattedDate(releaseDate)}
            </StandardTypography>
        </>
    );
};

export default ReleaseDateDisplay;