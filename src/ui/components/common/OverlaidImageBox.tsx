import React, { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

interface OverlaidImageBoxProps {
    overlayColor: string,
    overlayOpacity?: number,
    backgroundImageUrl: string,
    imageGrayScalePercentage?: number,
    imageAlt: string,
    borderRadius?: string,
    bottomLabelText?: string,
    sx?: SxProps,
    children: ReactNode
}

const OverlaidImageBox: React.FC<OverlaidImageBoxProps> = ({
    overlayColor,
    overlayOpacity = .5,
    backgroundImageUrl,
    imageGrayScalePercentage = 100,
    imageAlt,
    borderRadius = "0px",
    bottomLabelText = "",
    sx,
    children
}) => {
    
    const colorOverlayStyle = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        zIndex: 1,
        borderRadius: borderRadius
    };
    
    const backgroundImageStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        alt: imageAlt,
        filter: `grayscale(${imageGrayScalePercentage}%)`,
        zIndex: 0,
        borderRadius: borderRadius
    };
    
    return (
        <Stack
            position="relative"
            sx={sx}>
            <Stack
                className="full"
                position="absolute"
                style={colorOverlayStyle}/>
            <Stack
                className="full"
                position="absolute"
                style={backgroundImageStyle}/>
            <Box
                display="block"
                position="absolute"
                width="100%"
                bottom={0}>
                <Typography
                    variant="overline"
                    color="white"
                    fontWeight="bolder">
                    {bottomLabelText}
                </Typography>
            </Box>
            {children}
        </Stack>
    
    );
};

export default OverlaidImageBox;
