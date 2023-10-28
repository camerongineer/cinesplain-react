import React from "react";
import { Images } from "../../../models/Image";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getBackdropPath } from "../../../utils/retrievalUtils";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)`
  justify-content: center;
  align-items: center;
  max-width: 500px;
`;

interface LogoDisplayProps {
    images: Images;
    sx?: SxProps<Theme>;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ images, sx }) => (
    <StyledBox sx={sx}>
        <img width={"100%"} height={"auto"} src={getBackdropPath(images.logos[0].filePath)} alt={"logo"}/>
    </StyledBox>
);

export default LogoDisplay;