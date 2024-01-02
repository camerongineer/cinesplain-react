import axios, { AxiosResponse } from "axios";
import { SECURE_BASE_IMAGE_URL } from "../constants/ImageSizes";
import CastMember from "../models/castMember";
import Image, { Images } from "../models/Image";
import Movie from "../models/movie";
import Video from "../models/video";
import Person from "../types/person.ts";

const BASE_URL = import.meta.env.VITE_CINESPLAIN_API_URL;

const retrieveData = async (url: string) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    };
    const response: AxiosResponse = await axios.get(url, options);
    return JSON.stringify(response.data);
};

export const retrieveMovie = async (movieId: string | undefined) => {
    try {
        const res = await retrieveData(getMoviePath(movieId ? movieId : ""));
        if (res !== null) {
            const resObj = JSON.parse(res);
            return new Movie(
                resObj[Movie.objMap.adult],
                resObj[Movie.objMap.backdropPath],
                resObj[Movie.objMap.belongsToCollection],
                resObj[Movie.objMap.budget],
                resObj[Movie.objMap.genres],
                retrieveAllImages(resObj[Movie.objMap.images]),
                resObj[Movie.objMap.imdbId],
                resObj[Movie.objMap.movieId],
                resObj[Movie.objMap.movieTitle],
                resObj[Movie.objMap.originalLanguage],
                resObj[Movie.objMap.originalTitle],
                resObj[Movie.objMap.overview],
                resObj[Movie.objMap.popularity],
                resObj[Movie.objMap.posterPath],
                resObj[Movie.objMap.productionCompanies],
                resObj[Movie.objMap.productionCountries],
                resObj[Movie.objMap.releaseDate],
                resObj[Movie.objMap.revenue],
                resObj[Movie.objMap.runtime],
                resObj[Movie.objMap.spokenLanguages],
                resObj[Movie.objMap.status],
                resObj[Movie.objMap.tagline],
                resObj[Movie.objMap.video],
                retrieveVideos(resObj[Movie.objMap.videos]["results"]),
                resObj[Movie.objMap.voteAverage],
                resObj[Movie.objMap.voteCount]
            );
        } else {
            return res;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveMovies = async (url: string): Promise<Movie[] | null> => {
    try {
        const res: string | null = await retrieveData(url);
        if (res !== null) {
            const moviesArray = JSON.parse(res).results;
            const movieDetails = await Promise.all(
                moviesArray.map((resObj: any) => retrieveMovie(resObj[Movie.objMap.movieId]))
            );
            return movieDetails.filter((movie) => movie !== null);
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrievePopularMovieTitles = async (): Promise<string[]> => {
    try {
        return JSON.parse(<string>await retrieveData(getTop200MovieTitlesPath())) ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const retrievePerson = async (personId: string | undefined): Promise<Person> => {
    return JSON.parse(await retrieveData(getPersonPath(personId)));
};

const retrieveVideos = (res: object): Video[] => {
    if (res && Array.isArray(res)) {
        const videos: Video[] = [];
        res.map((videoObj) => {
            if (videoObj) {
                const video = new Video(
                    videoObj[Video.objMap.iso6391],
                    videoObj[Video.objMap.iso31661],
                    videoObj[Video.objMap.videoName],
                    videoObj[Video.objMap.videoKey],
                    videoObj[Video.objMap.publishedAt],
                    videoObj[Video.objMap.site],
                    videoObj[Video.objMap.size],
                    videoObj[Video.objMap.videoType],
                    videoObj[Video.objMap.official],
                    videoObj[Video.objMap.videoId]
                );
                if (video) videos.push(video);
            }
        });
        return videos;
    } else {
        return [];
    }
};

export const retrieveMovieTrailers = async (movieId: string | undefined): Promise<Video[]> => {
    try {
        if (!movieId) return [];
        const videoObjects = JSON.parse(<string>await retrieveData(getMovieTrailersPath(movieId))) ?? [];
        // @ts-expect-error
        return videoObjects.map((videoObj) => new Video(
            videoObj[Video.objMap.iso6391],
            videoObj[Video.objMap.iso31661],
            videoObj[Video.objMap.videoName],
            videoObj[Video.objMap.videoKey],
            videoObj[Video.objMap.publishedAt],
            videoObj[Video.objMap.site],
            videoObj[Video.objMap.size],
            videoObj[Video.objMap.videoType],
            videoObj[Video.objMap.official],
            videoObj[Video.objMap.videoId]
        ));
    } catch (error) {
        console.error(error);
        return [];
    }
};

const retrieveImages = (res: object): Image[] => {
    if (res && Array.isArray(res)) {
        const images: Image[] = [];
        res.map((imageObj) => {
            if (imageObj) {
                const image = new Image(
                    imageObj[Image.objMap.aspectRatio],
                    imageObj[Image.objMap.height],
                    imageObj[Image.objMap.iso6391],
                    imageObj[Image.objMap.filePath],
                    imageObj[Image.objMap.voteAverage],
                    imageObj[Image.objMap.voteCount],
                    imageObj[Image.objMap.width]
                );
                if (image) images.push(image);
            }
        });
        return images;
    } else {
        return [];
    }
};

const retrieveAllImages = (res: object) => {
    const images: Images = {
        backdrops: [],
        logos: [],
        posters: []
    };
    // @ts-expect-error
    images.backdrops = retrieveImages(res["backdrops"]);
    // @ts-expect-error
    images.logos = retrieveImages(res["logos"]);
    // @ts-expect-error
    images.posters = retrieveImages(res["posters"]);
    return images;
};

export const retrieveCredits = async (movieId: string) => {
    try {
        const res: string | null = await retrieveData(getMovieCastPath(movieId));
        if (res) {
            const credits: CastMember[] = [];
            const resObj = JSON.parse(res)["cast"];
            if (resObj && Array.isArray(resObj)) {
                resObj.map((creditObj) => {
                    if (creditObj) {
                        const castMember = new CastMember(
                            creditObj[CastMember.objMap.castMemberId],
                            creditObj[CastMember.objMap.castMemberName],
                            creditObj[CastMember.objMap.adult],
                            creditObj[CastMember.objMap.gender],
                            creditObj[CastMember.objMap.knownForDepartment],
                            creditObj[CastMember.objMap.originalName],
                            creditObj[CastMember.objMap.popularity],
                            creditObj[CastMember.objMap.profilePath],
                            creditObj[CastMember.objMap.castId],
                            creditObj[CastMember.objMap.character],
                            creditObj[CastMember.objMap.creditId],
                            creditObj[CastMember.objMap.order]
                        );
                        if (castMember) credits.push(castMember);
                    }
                });
            }
            return credits;
        } else {
            return [];
        }
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