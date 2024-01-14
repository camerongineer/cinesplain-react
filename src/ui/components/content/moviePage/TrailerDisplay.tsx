import {
    Box,
    Paper,
    Stack,
    styled
} from "@mui/material";
import React from "react";
import Movie from "../../../../types/movie.ts";
import Video from "../../../../types/video.ts";

import { getYouTubeTrailerPath } from "../../../../utils/retrievalUtils";

const StyledPaper = styled(Paper)`
    background: linear-gradient(270deg, ${props => props.theme.palette.background.paper}, ${props => props.theme.palette.primary.main}60);
    display: flex;
    width: 95%;
`;

interface TrailerCardProps {
    movie: Movie;
    trailer: Video;
}

const TrailerDisplay: React.FC<TrailerCardProps> = ({
    movie,
    trailer
}) => {
    return (
        <>
            {trailer && <Stack
                className="full center"
                pt={1}
                flex={{
                    md: 1,
                    lg: 2
                }}>
                <StyledPaper>
                    <Box
                        className="center"
                        component="iframe"
                        width="100%"
                        padding={2}
                        border={0}
                        style={{ aspectRatio: "16/9" }}
                        allow=""
                        src={getYouTubeTrailerPath(trailer.key)}
                        title={`${movie.title} trailer`}
                        allowFullScreen
                    />
                </StyledPaper>
            </Stack>}
        </>
    );
};

export default TrailerDisplay;