import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { AppBar,styled, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import SearchModal from "../content/search/SearchModal";

export enum HeaderLink {
    MOVIE = "Movies",
    TV = "TV"
}

interface HeaderProps {
    selectedTab: number,
    onSelectedTabChanged: (newSelectedTab: number) => void,
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    display: "flex",
    position: "sticky",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
}));

const CenteredToolbar = styled(Toolbar)(({ theme }) => ({
    maxWidth: (theme.breakpoints.values.xl - 100),
    width: "90%",
    marginTop: 6,
}));

const Header: React.FC<HeaderProps> = (props) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [animateLogo, setAnimateLogo] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateLogo(false);
        }, 2000);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    const handleSearchButtonClick = () => {
        setSearchModalOpen(!searchModalOpen);
    };
    
    return (
        <>
            {searchModalOpen && <SearchModal isModalOpen={searchModalOpen} onModalEvent={handleSearchButtonClick}/>}
            <StyledAppBar>
                <CenteredToolbar>
                    {/*{isSmallScreen &&*/}
                    {/*    <NavDrawer {...props}/>}*/}
                    {!isSmallScreen &&
                        <NavBar {...props} onSearchButtonClicked={handleSearchButtonClick} animateLogo={animateLogo}/>}
                </CenteredToolbar>
            </StyledAppBar>
        </>
    );
};

export default Header;