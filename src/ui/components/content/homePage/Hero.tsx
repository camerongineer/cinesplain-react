import React from "react";
import { Box, Stack, styled, Typography } from "@mui/material";

const StyledStack = styled(Stack)`
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em 0;
    user-select: none;
    overflow: auto;
    color: ${props => props.theme.palette.text.primary};
`;

const Hero: React.FC = () => (
    <StyledStack direction="row">
        <Box
            component="img"
            height={150}
            src={require("../../../images/cs_logo_up.png")}
            alt="CineSplain Logo"
        />
        <Stack>
            <Typography
                component="h1"
                variant={"h2"}>
                CineSplain
            </Typography>
            <Typography variant="h5">
                Your home for all-things cinema
            </Typography>
            <Typography variant="subtitle2">
                We've got some 'splaining to do...
            </Typography>
        </Stack>
    </StyledStack>
);

export default Hero;