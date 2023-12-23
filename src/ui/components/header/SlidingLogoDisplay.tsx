import React from "react";
import { Box, styled } from "@mui/material";

const SlidingLogo = styled("img")`
    height: 30px;
    position: relative;

    @keyframes slideIn {
        0% {
            left: -1000%;
        }

        25% {
            left: -1000%;
        }

        100% {
            left: 0;
        }
    }
`;

interface SlidingLogoDisplayProps {
    animateLogo: boolean;
}

const SlidingLogoDisplay: React.FC<SlidingLogoDisplayProps> = ({
    animateLogo
}) => (
    <Box
        display="flex"
        alignItems="center">
        <SlidingLogo
            alt="CineSplain logo"
            sx={{
                animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`
            }}
            src={require("../../images/cs_logo_text.png")}>
        </SlidingLogo>
        <SlidingLogo
            alt="CineSplain icon"
            sx={{
                animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`,
                height: "40px"
            }}
            src={require("../../images/cs_logo_up.png")}>
        </SlidingLogo>
    </Box>
);

export default SlidingLogoDisplay;