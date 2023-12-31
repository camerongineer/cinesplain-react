import { useEffect, useState } from "react";
import Movie from "../models/movie";
import { retrieveMovies } from "../utils/retrievalUtils";

const useLoadedMoviesState = (url: string): [Movie[], boolean] => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        retrieveMovies(url).then(newMovies => {
            setMovies(newMovies ? newMovies : []);
        }).catch(error => {
            console.error(error);
            setMovies([]);
        }).finally(() => setLoading(false));
    }, [url]);
    
    return [movies, loading];
};
export default useLoadedMoviesState;
