import axios, { AxiosResponse } from "axios";
import { SECURE_BASE_IMAGE_URL } from "../constants/ImageSizes";
import Credits from "../types/credits.ts";
import Movie from "../types/movie.ts";
import Person from "../types/person.ts";
import Video from "../types/video.ts";

const BASE_URL = import.meta.env.VITE_CINESPLAIN_API_URL;

const retrieveData = async (url: string): Promise<AxiosResponse> => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    };
    return (await axios.get(url, options)).data;
};

export const retrieveMovie = async (movieId: string): Promise<Movie | null> => {
    try {
        const res = await retrieveData(getMoviePath(movieId));
        return res.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveMovies = async (url: string): Promise<Movie[] | null> => {
    try {
        const res = await retrieveData(url);
        return res.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrievePopularMovieTitles = async (): Promise<string[] | null> => {
    try {
        const res = await retrieveData(getTop200MovieTitlesPath());
        return res.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const retrievePerson = async (personId: string): Promise<Person | null> => {
    try {
        const res = await retrieveData(getPersonPath(personId));
        return res.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveMovieTrailers = async (movieId: string): Promise<Video[] | null> => {
    try {
        const res = await retrieveData(getMovieTrailersPath(movieId));
        return res.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveCredits = async (movieId: string): Promise<Credits | null> => {
    try {
        const res = await retrieveData(getMovieCastPath(movieId));
        return res.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getImagePath = (relativePath: string, imageSize: string) =>
    `${SECURE_BASE_IMAGE_URL}${imageSize}${relativePath}`;

export const getMoviePath = (movieId: string) => `${BASE_URL}/movie/${movieId}`;
export const getMovieTrailersPath = (movieId: string) => `${BASE_URL}/movie/${movieId}/trailers`;

export const getYouTubeTrailerPath = (videoKey: string) => `https://www.youtube.com/embed/${videoKey}`;
export const getImdbPath = (imdbId: string) => `https://www.imdb.com/title/${imdbId}`;

export const getMoviesSearchPath = (
    searchQuery: string,
    page: number
) => `${BASE_URL}/movies/search?query=${searchQuery}&page=${page}`;
export const getPopularMoviesPath = (page: number) => `${BASE_URL}/movies/discover?page=${page}`;
export const getTop200MovieTitlesPath = () => `${BASE_URL}/movies/top_200_titles`;
export const getNowPlayingMoviesPath = () => `${BASE_URL}/movies/now_playing`;
export const getUpcomingMoviesPath = () => `${BASE_URL}/movies/upcoming`;
export const getClassicMoviesPath = () => `${BASE_URL}/movies/classics`;
export const getMostLovedMoviesPath = () => `${BASE_URL}/movies/most_loved`;
export const getMostHatedMoviesPath = () => `${BASE_URL}/movies/most_hated`;
export const getMovieCastPath = (movieId: string) => `${BASE_URL}/movie/${movieId}/credits`;
export const getSimilarMoviesPath = (movieId: string) => `${BASE_URL}/movie/${movieId}/similar`;
export const getMovieRecommendationsPath = (movieId: string) => `${BASE_URL}/movie/${movieId}/recommendations`;
export const getPersonPath = (personId: string | undefined) => `${BASE_URL}/person/${personId}`;