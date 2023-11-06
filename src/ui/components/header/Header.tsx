import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { AppBar, styled, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import SearchModal from "../content/search/SearchModal";
import { retrievePopularMovieTitles } from "../../../utils/retrievalUtils";

export enum HeaderLink {
    MOVIE = "Movies",
    TV = "TV"
}

interface HeaderProps {
    selectedTab: number,
    onSelectedTabChanged: (newSelectedTab: number) => void,
}

const StyledAppBar = styled(AppBar)`
    background: linear-gradient(
      ${props => props.theme.palette.secondary[props.theme.palette.mode]},
      ${props => props.theme.palette.secondary[props.theme.palette.mode]}99);
    color: ${props => props.theme.palette.getContrastText(props.theme.palette.secondary[props.theme.palette.mode])};
    position: sticky;
`;

const CenteredToolbar = styled(Toolbar)(({ theme }) => ({
    maxWidth: (theme.breakpoints.values.xl - 100),
    width: "90%",
    marginTop: 6
}));

const Header: React.FC<HeaderProps> = (props) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [animateLogo, setAnimateLogo] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    const [popularMovieTitles, setPopularMovieTitles] = useState<string[]>([]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateLogo(false);
        }, 2000);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    useEffect(() => {
        retrievePopularMovieTitles().then(popularMoviesTitles => {
            setPopularMovieTitles(popularMoviesTitles);
        }).catch((error) => console.log(error));
    }, []);
    
    const handleSearchButtonClick = () => {
        setSearchModalOpen(!searchModalOpen);
    };
    
    return (
        <>
            {searchModalOpen && <SearchModal isModalOpen={searchModalOpen} onModalEvent={handleSearchButtonClick}
                                             autoCompleteList={popularMovieTitles}/>}
            <StyledAppBar className={"center"} color={"info"}>
                <CenteredToolbar>
                    {/*{isSmallScreen &&*/}
                    {/*    <NavDrawer {...props}/>}*/}
                    
                    <NavBar {...props} onSearchButtonClicked={handleSearchButtonClick} animateLogo={animateLogo}/>
                </CenteredToolbar>
            </StyledAppBar>
        </>
    );
};

export default Header;