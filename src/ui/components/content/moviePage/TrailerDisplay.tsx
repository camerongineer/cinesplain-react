import React from "react";
import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Movie from "../../../../models/movie";
import { getYouTubeTrailerPath } from "../../../../utils/retrievalUtils";

interface TrailerCardProps {
    movie: Movie;
    sx?: SxProps<Theme>;
}

const TrailerDisplay: React.FC<TrailerCardProps> = ({ movie, sx }) => {
    const trailers = movie.videos.filter(video => video.videoType === "Trailer");
    return (
        <>
            {movie && trailers.length > 0 && <Box sx={sx}
                                                  component={"iframe"}
                                                  src={getYouTubeTrailerPath(trailers[0].videoKey)}
                                                  title={`${movie.movieTitle} trailer`}
                                                  allow=""
                                                  border={"0"}
                                                  allowFullScreen></Box>}
        </>
    );
};

export default TrailerDisplay;
