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
    padding: 1em 0;
    user-select: none;
    overflow: clip;
    color: ${props => props.theme.palette.text.primary};
`;

const Hero: React.FC = () => (
    <StyledStack direction="row">
        <CSLoadingIcon
            loadRotationMilliseconds={1250}
            height={150}
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