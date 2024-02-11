import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import CopyrightDisplay from "./CopyrightDisplay.tsx";
import DataCreditDisplay from "./DataCreditDisplay.tsx";
import FooterLogoDisplay from "./FooterLogoDisplay.tsx";
import LibraryIconDisplay from "./LibraryIconDisplay.tsx";
import SourceCodeDisplay from "./SourceCodeDisplay.tsx";

const StyledContainer = styled(Stack)`
    justify-content: center;
    align-content: center;
    min-height: 100px;
    width: 100%;
    margin-top: auto;
    padding: 2em 2em .5em;
    background: linear-gradient(180deg, #FFFFFF00, ${props => props.theme.palette.background.paper}, ${props => props.theme.palette.background.paper});
`;

const StyledContentWrapper = styled(Stack)`
    justify-content: space-evenly;
    align-content: center;
    width: 100%;
    gap: 1em;
`;

const Footer: React.FC = () => (
    <StyledContainer direction="column">
        <StyledContentWrapper direction={{ md: "row" }}>
            <SourceCodeDisplay/>
            <Stack
                justifyContent="space-evenly"
                spacing={.5}
                margin=".5em 1em"
                order={{ xs: 1, md: 0 }}
            >
                <FooterLogoDisplay/>
                <CopyrightDisplay/>
                <LibraryIconDisplay/>
            </Stack>
            <DataCreditDisplay/>
        </StyledContentWrapper>
    
    </StyledContainer>
);

export default Footer;