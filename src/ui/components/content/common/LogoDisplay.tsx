import {
    Box,
    useTheme
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import React from "react";
import { LOGO_SIZE } from "../../../../constants/ImageSizes";
import { Images } from "../../../../models/Image";
import { getImagePath } from "../../../../utils/retrievalUtils";

interface LogoDisplayProps {
    images: Images;
    sx?: SxProps<Theme>;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ images, sx }) => {
    const theme = useTheme();
    return (
        <Box
            component="img"
            width={{
                xs: "90%",
                md: theme.breakpoints.values.md,
                lg: theme.breakpoints.values.lg
            }}
            maxWidth={{
                md: 350,
                lg: "100%"
            }}
            maxHeight={{
                xs: 150,
                sm: 200
            }}
            mb={{
                xs: 3,
                sm: 2
            }}
            mt={{
                xs: 3,
                sm: 0
            }}
            sx={{
                ...sx,
                objectFit: "contain"
            }}
            src={getImagePath(images.logos[0].filePath, LOGO_SIZE.LG_W500)}
            alt="logo"
        />
    );
};

export default LogoDisplay;