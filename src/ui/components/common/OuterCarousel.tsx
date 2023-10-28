import React, { ReactNode } from "react";
import { Stack, styled } from "@mui/material";
import { SxProps } from "@mui/system";

const StyledStack = styled(Stack)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: scroll;
  scrollbar-width: "none";

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface OuterCarouselProps {
    children: ReactNode;
    sx?: SxProps;
}

const OuterCarousel: React.FC<OuterCarouselProps> = ({ children, sx }) => (
    <StyledStack sx={sx}>
        {children}
    </StyledStack>
);

export default OuterCarousel;