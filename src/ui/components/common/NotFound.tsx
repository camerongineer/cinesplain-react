import WagLeft from "@assets/cinesplain_logo_wag_left.svg?react";
import WagRight from "@assets/cinesplain_logo_wag_right.svg?react";
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

const WobblingStack = styled(Stack)`
    width: 100%;
    align-items: center;
    animation: wobble 4000ms infinite alternate;
    @keyframes wobble {
        0%, 25% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(2deg);
        }
    }
`;

const StyledWagLeft = styled(WagLeft)`
    width: clamp(200px, 75%, 500px);
    height: auto;
`;

const StyledWagRight = styled(WagRight)`
    width: clamp(200px, 75%, 500px);
    height: auto;
`;

const NotFound = () => {
    const [degrees, setDegrees] = useState(0);
    const [waggingState, setWaggingState] = useState(true);
    const theme = useTheme();
    
    useEffect(() => {
        const degreesIntervalId = setInterval(() => {
            setDegrees((prevDegrees) => (prevDegrees - 1) % 360);
        }, 10);
        
        const waggingIntervalId = setInterval(() => {
            setWaggingState((prevWagState) => !prevWagState);
        }, 1250);
        
        return () => {
            clearInterval(degreesIntervalId);
            clearInterval(waggingIntervalId);
        };
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
            <Stack
                width="80%"
                textAlign="center"
            >
                <WobblingStack>
                    {waggingState ? <StyledWagLeft/> : <StyledWagRight/>}
                </WobblingStack>
                <Typography
                    variant="h2"
                    textAlign="center"
                    mb={1}
                >
                    You don't belong here.
                </Typography>
                <RouterLink to="/">
                    <MuiLink
                        component="span"
                        variant="h4"
                    >
                        Click to go home
                    </MuiLink>
                </RouterLink>
            </Stack>
        </StyledStack>
    );
};

export default NotFound;
