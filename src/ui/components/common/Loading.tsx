import csLogoText from "@assets/cs_logo_text.png";
import upIcon from "@assets/cs_logo_up.png";
import {
    Stack,
    styled
} from "@mui/material";

const StyledStack = styled(Stack)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
`;

const StyledIcon = styled("img")`
    width: 35%;
    animation: spin 2500ms linear infinite;
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const StyledLogo = styled("img")`
    width: 50%;
    padding-top: 50px;
`;

const Loading = () => {
    return (
        <StyledStack className="full center">
            <StyledIcon src={upIcon} alt="spinning icon"/>
            <StyledLogo src={csLogoText} alt={"CineSplain logo"}/>
        </StyledStack>
    );
};

export default Loading;