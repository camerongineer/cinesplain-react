import DownIcon from "@assets/cinesplain_logo_down.svg?react";
import UpIcon from "@assets/cinesplain_logo_up.svg?react";
import csLogoText from "@assets/cinesplain_text_logo.svg";
import {
    Stack,
    styled,
    useTheme
} from "@mui/material";
import {
    useEffect,
    useState
} from "react";

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

const StyledLogo = styled("img")`
    width: clamp(230px, 50%, 800px);
    padding-top: 20px;
`;

const StyledDownIcon = styled(DownIcon)`
    width: clamp(200px, 30%, 500px);
    height: auto;
`;

const StyledUpIcon = styled(UpIcon)`
    width: clamp(200px, 30%, 500px);
    height: auto;
`;

const Loading = () => {
    const [degrees, setDegrees] = useState(0);
    const [splainingState, setSplainingState] = useState(true);
    const theme = useTheme();
    
    useEffect(() => {
        const degreesIntervalId = setInterval(() => {
            setDegrees((prevDegrees) => (prevDegrees - 1) % 360);
        }, 10);
        
        const waggingIntervalId = setInterval(() => {
            setSplainingState((prevWagState) => !prevWagState);
        }, 1250);
        
        return () => {
            clearInterval(degreesIntervalId);
            clearInterval(waggingIntervalId);
        };
    }, []);
    
    const getLoadingStyle = () => {
        return {
            minHeight: "100vh",
            alignItems: "center",
            background: `linear-gradient(${degrees}deg,
                  ${theme.palette.secondary.main}80,
                  ${theme.palette.secondary.main}55,
                  ${theme.palette.secondary.main}45,
                  ${theme.palette.secondary.main}55,
                  ${theme.palette.secondary.main}80),
                  ${theme.palette.background.default}`
        };
    };
    
    return (
        <StyledStack
            className="full center"
            style={getLoadingStyle()}
        >
            <WobblingStack>
                {splainingState ? <StyledUpIcon/> : <StyledDownIcon/>}
            </WobblingStack>
            <StyledLogo
                src={csLogoText}
                alt="CineSplain logo"
            />
        </StyledStack>
    );
};

export default Loading;
