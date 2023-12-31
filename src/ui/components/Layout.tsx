import {
    Stack,
    styled,
    useTheme
} from "@mui/material";
import React, {
    useEffect,
    useState
} from "react";
import {
    Outlet,
    useNavigation
} from "react-router-dom";
import useScrollToTop from "../../hooks/UseScrollToTop";
import Header from "./header/Header";

const StyledStack = styled(Stack)`
    max-width: ${props => props.theme.breakpoints.values.xl}px;
    width: 100%;
`;

const Layout: React.FC = () => {
    const [degrees, setDegrees] = useState(100);
    const theme = useTheme();
    const navigation = useNavigation();
    
    useEffect(() => {
        if (navigation.state === "loading") {
            const intervalId = setInterval(() => {
                setDegrees((prevDegrees) => (prevDegrees + 1) % 360);
            }, 15);
            
            return () => clearInterval(intervalId);
        }
    }, [navigation.state]);
    
    useScrollToTop();
    const getLoadingStyle = () => {
        return {
            background:
                navigation.state === "loading"
                    ? `linear-gradient(${degrees}deg,
                        ${theme.palette.secondary.main}80,
                        ${theme.palette.secondary.main}25,
                        ${theme.palette.secondary.main}80),
                        ${theme.palette.background.default}`
                    : ""
        };
    };
    return (
        <Stack className="full center" style={getLoadingStyle()}>
            <Header/>
            <StyledStack>
                <Outlet/>
            </StyledStack>
        </Stack>
    );
};

export default Layout;