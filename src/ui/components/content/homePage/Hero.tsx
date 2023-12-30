import {
    Stack,
    styled,
    Typography
} from "@mui/material";
import React from "react";
import CSLoadingIcon from "../../common/CSLoadingIcon";

const StyledStack = styled(Stack)`
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0;
    margin: 2em 0 1em;
    user-select: none;
    overflow-x: clip;
`;

const Hero: React.FC = () => (
    <StyledStack direction="row">
        <CSLoadingIcon
            loadRotationMilliseconds={1250}
            height={{ xs: 100, md: 125 }}
        />
        <Stack>
            <Typography
                component="h1"
                variant="h2"
            >
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