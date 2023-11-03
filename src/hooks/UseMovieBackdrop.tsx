import Movie from "../models/movie";
import { useEffect, useState } from "react";
import { getBackdropPath } from "../utils/retrievalUtils";

const useMovieBackdrop = (movie: Movie | null) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        if (movie && !movie.backdropPath) {
            setBackgroundImageLoaded(true);
        }
        if (!backgroundImage) return;
        const backgroundImageUrl = backgroundImage;
        const backgroundImg = new Image();
        backgroundImg.src = backgroundImageUrl;
        backgroundImg.alt = `${movie?.movieTitle} backdrop`;
        backgroundImg.onload = () => {
            setBackgroundImageLoaded(true);
        };
    }, [backgroundImage]);
    
    useEffect(() => {
        if (movie && movie.backdropPath) {
            setBackgroundImage(getBackdropPath(movie.backdropPath));
        }
    }, [movie]);
    return { backgroundImage, backgroundImageLoaded };
};

export default useMovieBackdrop;