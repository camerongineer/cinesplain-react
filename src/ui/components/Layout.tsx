import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import useScrollToTop from "../../hooks/UseScrollToTop";
import Header from "./header/Header";

const StyledStack = styled(Stack)`
    max-width: ${props => props.theme.breakpoints.values.xl}px;
    width: 100%;
`;

const Layout: React.FC = () => {
    useScrollToTop();
    return (
        <Stack className="full center">
            <Header/>
            <StyledStack>
                <Outlet/>
            </StyledStack>
        </Stack>
    );
};

export default Layout;