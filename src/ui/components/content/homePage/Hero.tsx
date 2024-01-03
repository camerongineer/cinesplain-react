import CSLogoText from "@assets/cs_logo_text.png";
import {
    Box,
    Stack,
    styled,
    Typography
} from "@mui/material";
import React from "react";
import CSLoadingIcon from "../../common/CSLoadingIcon";

const StyledStack = styled(Stack)`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    gap: 1em;
    margin: 2em 0 0;
    user-select: none;
    overflow-x: clip;
`;

const Hero: React.FC = () => {
    
    return (
        <StyledStack direction={{
            xs: "column",
            sm: "row"
        }}>
            <Stack>
                <CSLoadingIcon
                    loadRotationMilliseconds={1250}
                    width={{
                        xs: 100,
                        sm: 150
                    }}
                />
            </Stack>
            <Stack
                alignItems="center"
                maxWidth={"80%"}
            >
                <Box
                    component="img"
                    src={CSLogoText}
                    alt="CineSplain"
                    maxWidth="100%"
                    maxHeight="75px"
                />
                <Typography
                    variant="h6"
                    pt={1}
                >
                    Your home for all-things cinema
                </Typography>
                <Typography variant="subtitle2">
                    We've got some 'splaining to do...
                </Typography>
            </Stack>
        </StyledStack>
    );
};

export default Hero;