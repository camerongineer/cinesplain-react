import React, { ReactNode } from "react";
import { Stack } from "@mui/material";
import { SxProps } from "@mui/system";

interface OverlaidImageBoxProps {
    overlayColor: string,
    overlayOpacity?: number,
    backgroundImageUrl: string,
    imageGrayScalePercentage?: number,
    imageAlt: string,
    borderRadius?: string,
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
            {children}
        </Stack>
    
    );
};

export default OverlaidImageBox;
