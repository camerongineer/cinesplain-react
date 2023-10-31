import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedDate } from "../../../../utils/formatUtils";
import { Typography } from "@mui/material";

interface ReleaseDateDisplayProps {
    releaseDate: string;
    includeLabel?: boolean;
    sx?: SxProps<Theme>;
}

const ReleaseDateDisplay: React.FC<ReleaseDateDisplayProps> = ({ releaseDate, includeLabel, sx }) => {
    const releaseLabelText = new Date() > new Date(releaseDate) ? "Released on" : "Releases on";
    return (
        <>
            <Typography variant={"body1"}
                        sx={sx}>{(includeLabel ? <b>{releaseLabelText}:&nbsp;</b> : "")}{getFormattedDate(releaseDate)}
            </Typography>
        </>
    );
};

export default ReleaseDateDisplay;