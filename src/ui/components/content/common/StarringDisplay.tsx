import {
    Stack,
    Typography
} from "@mui/material";
import React from "react";

interface StarringDisplayProps {
    stars: string;
}

const StarringDisplay: React.FC<StarringDisplayProps> = ({
    stars
}) => (
    <Stack>
        <Typography
            display="inline"
            variant="overline"
            fontWeight="bold"
        >
            Starring
        </Typography>
        <Typography display="inline">
            {stars}
        </Typography>
    </Stack>
);

export default StarringDisplay;