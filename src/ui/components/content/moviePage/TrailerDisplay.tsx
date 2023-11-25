import React, { useEffect, useState } from "react";
import { Box, Paper, styled } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import Movie from "../../../../models/movie";
import { getYouTubeTrailerPath, retrieveMovieTrailers } from "../../../../utils/retrievalUtils";
import Video from "../../../../models/video";

const StyledPaper = styled(Paper)`
  background: linear-gradient(270deg, ${props => props.theme.palette.grey[200]}, ${props => props.theme.palette.grey[500]});
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TrailerCardProps {
    movie: Movie;
    sx?: SxProps<Theme>;
}

const TrailerDisplay: React.FC<TrailerCardProps> = ({ movie, sx }) => {
    const [trailer, setTrailer] = useState<Video | null>(null);
    
    useEffect(() => {
        retrieveMovieTrailers(movie.movieId.toString()).then(res => {
            if (res.length > 0 && res[0]) {
                setTrailer(res[0]);
            }
        });
    }, [movie]);
    
    return (
        <>
            {trailer && <StyledPaper key={movie.movieId}
                                     sx={sx}
                                     elevation={5}>
                <Box sx={sx}
                     component={"iframe"}
                     src={getYouTubeTrailerPath(trailer.videoKey)}
                     title={`${movie.movieTitle} trailer`}
                     allow=""
                     border={"0"}
                     allowFullScreen></Box>
            </StyledPaper>}
        </>
    );
};

export default TrailerDisplay;
