import React from "react";
import Router from "./Router";
import { Stack, styled, ThemeProvider } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";

const StyledStack = styled(Stack)`
    background: linear-gradient(100deg,
    ${props => props.theme.palette.secondary.main}80,
    ${props => props.theme.palette.secondary.main}25,
    ${props => props.theme.palette.secondary.main}80),
    ${props => props.theme.palette.background.default};
    min-width: 280px;
`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <StyledStack className="full">
                <Router/>
            </StyledStack>
        </ThemeProvider>
    );
};

export default App;