import React from "react";
import { Images } from "../../../../models/Image";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { getImagePath } from "../../../../utils/retrievalUtils";
import { Box } from "@mui/material";

interface LogoDisplayProps {
    images: Images;
    sx?: SxProps<Theme>;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ images, sx }) => (
    <Box component={"img"}
         width={{ xs: "60%", md: "80%" }}
         maxWidth={{ md: "350px" }}
         mb={{ xs: 3, sm: 2 }}
         mt={{ xs: 3, sm: 0 }}
         sx={sx}
         src={getImagePath(images.logos[0].filePath)}
         alt={"logo"}/>
);

export default LogoDisplay;