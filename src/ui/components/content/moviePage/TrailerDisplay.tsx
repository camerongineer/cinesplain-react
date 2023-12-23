import React from "react";
import { Box, Paper, Stack, styled } from "@mui/material";
import Movie from "../../../../models/movie";
import { getYouTubeTrailerPath } from "../../../../utils/retrievalUtils";
import Video from "../../../../models/video";

const StyledPaper = styled(Paper)`
    background: linear-gradient(270deg, ${props => props.theme.palette.background.paper}, ${props => props.theme.palette.grey[600]});
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
                flex={{
                    md: 2,
                    lg: 3
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
                        src={getYouTubeTrailerPath(trailer.videoKey)}
                        title={`${movie.movieTitle} trailer`}
                        allowFullScreen
                    />
                </StyledPaper>
            </Stack>}
        </>
    );
};

export default TrailerDisplay;