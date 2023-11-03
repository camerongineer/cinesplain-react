import React, { ReactNode } from "react";
import { Stack, styled } from "@mui/material";
import { SxProps } from "@mui/system";

const StyledStack = styled(Stack)`
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
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
    <StyledStack className={"full"} sx={sx}>
        {children}
    </StyledStack>
);

export default OuterCarousel;