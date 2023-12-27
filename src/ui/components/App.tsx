import {
    CssBaseline,
    Stack,
    styled,
    ThemeProvider
} from "@mui/material";
import React from "react";
import defaultTheme from "../themes/defaultTheme";
import Router from "./Router";

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
            <CssBaseline/>
            <StyledStack className="full">
                <Router/>
            </StyledStack>
        </ThemeProvider>
    );
};

export default App;