import React from "react";
import { StandardTypography } from "../../styles/Typography";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getFormattedDate } from "../../../utils/formatUtils";

interface ReleaseDateTypographyProps {
    releaseDate: string;
    sx?: SxProps<Theme>;
}

const ReleaseDateTypography: React.FC<ReleaseDateTypographyProps> = ({ releaseDate, sx }) => {
    const date = Date.parse(releaseDate);
    return (
        <>
            <StandardTypography
                variant={"h5"}
                sx={sx}>{`Release${date > Date.now() ? "s" : "d"}: ${getFormattedDate(releaseDate)}`}
            </StandardTypography>
        </>
    );
};

export default ReleaseDateTypography;