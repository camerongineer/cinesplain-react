import {
    Stack,
    Typography
} from "@mui/material";
import React from "react";

interface WritersDisplayProps {
    writers: string;
}

const WritersDisplay: React.FC<WritersDisplayProps> = ({
    writers
}) => (
    <Stack>
        <Typography
            display="inline"
            variant="overline"
            fontWeight="bold"
        >
            Writers
        </Typography>
        <Typography display="inline">
            {writers}
        </Typography>
    </Stack>
);

export default WritersDisplay;