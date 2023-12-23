import React from "react";
import { Outlet } from "react-router-dom";
import { Stack, styled } from "@mui/material";
import Header from "./header/Header";

const StyledStack = styled(Stack)`
    max-width: ${props => props.theme.breakpoints.values.xl}px;
`;

const Layout: React.FC = () => (
    <Stack className="full center">
        <Header/>
        <StyledStack>
            <Outlet/>
        </StyledStack>
    </Stack>
);

export default Layout;