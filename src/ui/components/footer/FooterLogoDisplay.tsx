import CSLogoText from "@assets/cinesplain_text_logo.svg?react";
import {
    Stack,
    styled
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CSLoadingIcon from "../common/CSLoadingIcon.tsx";

const StyledStack = styled(Stack)`
    flex-direction: row;
    justify-content: center;
    margin-bottom: .25em;
    cursor: pointer;
    height: 23px;
    min-width: 150px;
`;

const FooterLogoDisplay: React.FC = () => {
    const navigate = useNavigate();
    
    const handleClick = () => navigate("/");
    
    return (
        <StyledStack onClick={handleClick}>
            <CSLoadingIcon/>
            <CSLogoText/>
        </StyledStack>
    );
};

export default FooterLogoDisplay;