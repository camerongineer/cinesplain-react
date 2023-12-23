import React from "react";
import { Stack, styled } from "@mui/material";

const StyledStack = styled(Stack)`
  position: relative;
    height: 100lvh;
  overflow: hidden;
`;

const StyledIcon = styled("img")`
  width: 25%;
  animation: spin 2000ms linear infinite;
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
  width: 40%;
  padding-top: 20px;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
    return (
        <StyledStack className="full center">
            <StyledIcon src={require("../../images/cs_logo_up.png")} alt={"spinning icon"}/>
            <StyledLogo src={require("../../images/cs_logo_text.png")} alt={"CineSplain logo"}/>
        </StyledStack>
    );
};

export default Loading;