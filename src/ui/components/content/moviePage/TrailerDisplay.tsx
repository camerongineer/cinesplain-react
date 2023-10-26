import React from "react";
import { Box, Paper, styled } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Movie from "../../../../models/movie";
import { getYouTubeTrailerPath } from "../../../../utils/retrievalUtils";

const StyledPaper = styled(Paper)`
  background: linear-gradient(270deg, ${props => props.theme.palette.grey[200]}, ${props => props.theme.palette.grey[500]});
  padding: 10px 10px 0 10px;
  width: 100%;
`;

interface TrailerCardProps {
    movie: Movie;
    sx?: SxProps<Theme>;
}

const TrailerDisplay: React.FC<TrailerCardProps> = ({ movie, sx }) => {
    const trailers = movie.videos.filter(video => video.videoType === "Trailer");
    return (
        <StyledPaper sx={sx} elevation={5}>
            {movie && trailers.length > 0 && <Box sx={sx}
                                                  component={"iframe"}
                                                  src={getYouTubeTrailerPath(trailers[0].videoKey)}
                                                  title={`${movie.movieTitle} trailer`}
                                                  allow=""
                                                  border={"0"}
                                                  allowFullScreen></Box>}
        </StyledPaper>
    );
};

export default TrailerDisplay;
