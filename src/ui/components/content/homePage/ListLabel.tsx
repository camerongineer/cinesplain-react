import React from "react";
import { Stack, StackProps, styled, Typography } from "@mui/material";

const StyledStack = styled(Stack)`
    flex-direction: row;
    justify-content: end;
    user-select: none;
`;

interface ListLabelProps extends StackProps {
    labelText: string;
}

const ListLabel: React.FC<ListLabelProps> = ({ labelText, ...props }) => (
    <StyledStack {...props}>
        <img
            height="30px"
            src={require("../../../images/cs_logo_up.png")}
            alt="CineSplain Logo"/>
        <Typography
            component="label"
            variant="h5"
            pl={.25}>
            {labelText}
        </Typography>
    </StyledStack>
);

export default ListLabel;