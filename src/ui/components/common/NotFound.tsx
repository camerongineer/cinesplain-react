import wagLeft from "@assets/cinesplain_logo_wag_left.svg";
import wagRight from "@assets/cinesplain_logo_wag_right.svg";
import {
    alpha,
    Link as MuiLink,
    Stack,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import {
    useEffect,
    useState
} from "react";
import { Link as RouterLink } from "react-router-dom";

const StyledStack = styled(Stack)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
`;

const StyledIcon = styled("img")`
    width: 40%;
    animation: alternateIcon 1500ms linear infinite, wobble 4000ms infinite alternate;

    @keyframes alternateIcon {
        0%, 25%, 100% {
            content: url(${wagLeft});
        }
        75% {
            content: url(${wagRight});
        }
    }

    @keyframes wobble {
        0%, 25% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(2deg);
        }
    }
`;

const NotFound = () => {
    const [degrees, setDegrees] = useState(0);
    const theme = useTheme();
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDegrees((prevDegrees) => (prevDegrees - 1) % 360);
        }, 10);
        
        return () => clearInterval(intervalId);
    }, []);
    
    const getErrorStyle = () => {
        return {
            minHeight: "100vh",
            alignItems: "center",
            background: `linear-gradient(${degrees}deg,
                  ${alpha(theme.palette.error.main, .9)},
                  ${alpha(theme.palette.error.main, .55)},
                  ${alpha(theme.palette.error.main, .35)},
                  ${alpha(theme.palette.error.main, .55)},
                  ${alpha(theme.palette.error.main, .9)}),
                  ${theme.palette.background.default}`
        };
    };
    
    return (
        <StyledStack
            className="full center"
            style={getErrorStyle()}
        >
            <StyledIcon alt="error icon"/>
            <Typography
                variant="h2"
                textAlign="center"
                mb={1}
            >
                You don't belong here.
            </Typography>
            <RouterLink to="/">
                <MuiLink variant="h4">
                    Click to go home
                </MuiLink>
            </RouterLink>
        </StyledStack>
    );
};

export default NotFound;
