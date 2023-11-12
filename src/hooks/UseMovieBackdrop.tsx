import Movie from "../models/movie";
import { useEffect, useState } from "react";
import { getImagePath } from "../utils/retrievalUtils";
import { BACKDROP_SIZE } from "../constants/ImageSizes";

const useMovieBackdrop = (movie: Movie | null, imageWidth: string = BACKDROP_SIZE.MAX) => {
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
            setBackgroundImage(getImagePath(movie.backdropPath, imageWidth));
        }
    }, [movie]);
    return { backgroundImage, backgroundImageLoaded };
};

export default useMovieBackdrop;