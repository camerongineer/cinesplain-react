import React from "react";
import { Stack, styled, Typography } from "@mui/material";
import { SxProps } from "@mui/system";

const StyledStack = styled(Stack)`
  flex-direction: row;
  justify-content: end;
  padding: 5px 1em;
`;

interface ListLabelProps {
    labelText: string;
    fontColor: string;
    sx?: SxProps;
}

const ListLabel: React.FC<ListLabelProps> = ({ labelText, fontColor, sx }) => (
    <StyledStack color={fontColor} sx={sx}>
        <img height={"35px"}
             src={require("../../../images/cs_logo_up.png")}
             alt={"CineSplain Logo"}/>
        <Typography variant={"h5"}>
            {labelText}
        </Typography>
    </StyledStack>
);

export default ListLabel;