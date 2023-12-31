import {
    AppBar,
    styled,
    Toolbar
} from "@mui/material";
import React, {
    useEffect,
    useState
} from "react";
import { useRouteLoaderData } from "react-router-dom";
import { retrievePopularMovieTitles } from "../../../utils/retrievalUtils";
import SearchModal from "../content/search/SearchModal";
import NavBar from "./NavBar";

const StyledAppBar = styled(AppBar)`
    background: linear-gradient(${props => props.theme.palette.primary.main},
    ${props => props.theme.palette.primary.main}99);
    color: ${props => props.theme.palette.primary.contrastText};
    position: sticky;
`;

const CenteredToolbar = styled(Toolbar)`
    max-width: ${props => props.theme.breakpoints.values.xl - 100}px;
    width: 90%;
    margin-top: 6px;
`;

const headerLoader = async () => {
    return await retrievePopularMovieTitles() ?? [];
};

interface LoaderData {
    headerData: string[];
}

const Header: React.FC = () => {
    const [animateLogo, setAnimateLogo] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    const { headerData: popularMovieTitles } = useRouteLoaderData("root") as LoaderData;
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateLogo(false);
        }, 2000);
        
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    const handleToggleModal = () => {
        setSearchModalOpen(!searchModalOpen);
    };
    
    return (
        <>
            {searchModalOpen && <SearchModal
                modalOpen={searchModalOpen}
                onModalEvent={handleToggleModal}
                autoCompleteList={popularMovieTitles}
            />}
            <StyledAppBar className="center">
                <CenteredToolbar>
                    <NavBar
                        onSearchButtonClicked={handleToggleModal}
                        animateLogo={animateLogo}
                    />
                </CenteredToolbar>
            </StyledAppBar>
        </>
    );
};

export { headerLoader };
export default Header;