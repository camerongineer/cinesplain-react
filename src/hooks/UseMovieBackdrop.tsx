import {
    useEffect,
    useState
} from "react";
import { BACKDROP_SIZE } from "../constants/ImageSizes";
import Movie from "../models/movie";
import { getImagePath } from "../utils/retrievalUtils";

const useMovieBackdrop = (movie: Movie | null, imageSize: string = BACKDROP_SIZE.MAX): [string, boolean] => {
    const [backgroundImage, setBackgroundImage] = useState<string>("");
    const [backgroundImageLoading, setBackgroundImageLoading] = useState<boolean>(true);
    
    useEffect(() => {
        if (!movie) return;
        if (movie.backdropPath) {
            const backgroundImageUrl = backgroundImage;
            const backgroundImg = new Image();
            backgroundImg.src = backgroundImageUrl;
            backgroundImg.alt = `${movie?.movieTitle} backdrop`;
            backgroundImg.onload = () => setBackgroundImageLoading(false);
        } else {
            setBackgroundImageLoading(false);
        }
    }, [backgroundImage, movie]);
    
    useEffect(() => {
        if (movie && movie.backdropPath) {
            setBackgroundImage(getImagePath(movie.backdropPath, imageSize));
        }
    }, [movie, imageSize]);
    return [backgroundImage, backgroundImageLoading];
};

export default useMovieBackdrop;