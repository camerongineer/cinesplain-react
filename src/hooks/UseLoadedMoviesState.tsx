import { useEffect, useState } from "react";
import Movie from "../models/movie";
import { retrieveMovies } from "../utils/retrievalUtils";

const useLoadedMoviesState = (url: string): Movie[] => {
    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        retrieveMovies(url).then(newMovies => {
            setMovies(newMovies ? newMovies : []);
        }).catch(error => {
            console.error(error);
            setMovies([]);
        });
    }, [url]);
    
    return movies;
};
export default useLoadedMoviesState;
