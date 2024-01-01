import csLogoText from "@assets/cs_logo_text.png";
import {
    Box,
    styled
} from "@mui/material";
import React from "react";
import CSLoadingIcon from "../common/CSLoadingIcon";

const SlidingLogo = styled(Box)`
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
    <SlidingLogo
        display="flex"
        alignItems="center"
        sx={{
            animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`
        }}
    >
        <Box
            component="img"
            alt="CineSplain logo"
            height={30}
            src={csLogoText}
        />
        <CSLoadingIcon
            height={40}
            loadRotationMilliseconds={900}
        />
    </SlidingLogo>
);

export default SlidingLogoDisplay;