import {
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import { getCSRatingColor } from "../../../../utils/ratingUtils.ts";
import CSPopcorn from "../../common/CSPopcorn.tsx";

interface CSRatingDisplayProps {
    voteAverage: number;
}

const CSRatingDisplay: React.FC<CSRatingDisplayProps> = ({
    voteAverage
}) => (
    <Stack direction="row" spacing={.5}>
        <CSPopcorn
            width={"20px"}
            ratingColor={getCSRatingColor(voteAverage)}
        />
        <Typography><b>CineSplain Rating:&nbsp;</b>{voteAverage}</Typography>
    </Stack>
);

export default CSRatingDisplay;