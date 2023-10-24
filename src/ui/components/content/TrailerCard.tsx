import * as React from "react";
import { Box } from "@mui/material";
import Movie from "../../../models/movie";
import { getYouTubeTrailerPath } from "../../../utils/retrievalUtils";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface TrailerCardProps {
    movie: Movie;
    sx?: SxProps<Theme>;
}

const TrailerCard: React.FC<TrailerCardProps> = ({ movie, sx }) => {
    const trailers = movie.videos.filter(video => video.videoType === "Trailer");
    return (
        <>
            {movie && trailers.length > 0 && <Box sx={sx}
                                                  component={"iframe"}
                                                  src={getYouTubeTrailerPath(trailers[0].videoKey)}
                                                  title={`${movie.movieTitle} trailer`}
                                                  allow=""
                                                  frameBorder={"0"}
                                                  allowFullScreen></Box>}
        </>
    );
};

export default TrailerCard;