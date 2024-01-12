import downIcon from "@assets/cinesplain_logo_down.svg";
import upIcon from "@assets/cinesplain_logo_up.svg";
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

const StyledIcon = styled("img")`
    width: 35%;
    animation: alternateIcon 750ms linear infinite, wobble 2500ms infinite alternate;

    @keyframes alternateIcon {
        0%, 25%, 100% {
            content: url(${upIcon});
        }
        75% {
            content: url(${downIcon});
        }
    }

    @keyframes wobble {
        0%, 25% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(4deg);
        }
    }
`;

const StyledLogo = styled("img")`
    width: 50%;
    padding-top: 50px;
`;

const Loading = () => {
    const [degrees, setDegrees] = useState(0);
    const theme = useTheme();
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDegrees((prevDegrees) => (prevDegrees + 1) % 360);
        }, 10);
        
        return () => clearInterval(intervalId);
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
            <StyledIcon alt="Splaining icon"/>
            <StyledLogo
                src={csLogoText}
                alt="CineSplain logo"
            />
        </StyledStack>
    );
};

export default Loading;
