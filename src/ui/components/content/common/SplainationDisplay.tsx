import React from "react";
import { Box, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)`
  flex-direction: row;
  padding: 15px 0 6px 0;
  gap: 2px;
`;

interface SplainationDisplayProps {
    overview: string;
}

const SplainationDisplay: React.FC<SplainationDisplayProps> = ({ overview }) => (
    <>
        <StyledBox className={"full center"}>
            <Box height={"30px"}
                 component={"img"}
                 src={require("../../../images/cs_logo_up.png")}
            />
            <Typography variant={"h6"}
                        fontWeight={"bold"}
                        width={"fit-content"}>
                'Splaination
            </Typography>
        </StyledBox>
        <Typography variant={"body1"}
                    pb={5}>
            {overview}
        </Typography>
    </>
);

export default SplainationDisplay;