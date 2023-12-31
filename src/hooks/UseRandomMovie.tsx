import { useEffect, useState } from "react";
import Movie from "../models/movie";

const useRandomMovie = (movies: Movie[], interval: number, requireBackdrop: boolean = false) => {
    const [randomMovieIndex, setRandomMovieIndex] = useState(0);
    const [initialRender, setInitialRender] = useState(true);
    
    const filteredMovies = requireBackdrop ? movies.filter(movie => movie.backdropPath) : movies;
    
    useEffect(() => {
        if (initialRender && filteredMovies.length) {
            setRandomMovieIndex(Math.floor(Math.random() * filteredMovies.length));
            setInitialRender(false);
        }
    }, [initialRender, movies]);
    
    useEffect(() => {
        if (filteredMovies.length) {
            const timer = setInterval(() => {
                setRandomMovieIndex((prevIndex) => {
                    const newIndex = Math.floor(Math.random() * filteredMovies.length);
                    return newIndex !== prevIndex ? newIndex : (newIndex + 1) % filteredMovies.length;
                });
            }, interval);
            
            return () => {
                clearInterval(timer);
            };
        }
    }, [movies, interval]);
    
    return filteredMovies[randomMovieIndex];
};

export default useRandomMovie;