

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