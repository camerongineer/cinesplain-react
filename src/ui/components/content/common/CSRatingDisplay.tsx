import CSText from "@assets/cinesplain_text_logo.svg?react";
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
    <Stack
        direction="row"
        alignItems="center"
        spacing={.5}
    >
        <CSText height={15}/>
        <CSPopcorn
            width={"20px"}
            ratingColor={getCSRatingColor(voteAverage)}
        />
        <Typography
            display="inline"
            fontWeight="bold"
        >
            Rating:
        </Typography>
        <Typography
            display="inline"
            variant="h6"
        >
            {voteAverage}
        </Typography>
    </Stack>
);

export default CSRatingDisplay;