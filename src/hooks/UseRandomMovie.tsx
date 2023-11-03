import Movie from "../models/movie";
import { useEffect, useState } from "react";

const useRandomMovie = (movies: Movie[], interval: number, requireBackdrop: boolean = false) => {
    const [randomMovieIndex, setRandomMovieIndex] = useState(Math.floor(movies.length / 2));
    useEffect(() => {
        const timer = setInterval(() => {
            setRandomMovieIndex(prevIndex => {
                const newIndex = Math.floor(Math.random() * movies.length);
                return newIndex !== prevIndex ? newIndex : (newIndex + 1) % movies.length;
            });
        }, interval);
        
        return () => {
            clearInterval(timer);
        };
    }, [movies]);
    return movies[randomMovieIndex];
};

export default useRandomMovie;