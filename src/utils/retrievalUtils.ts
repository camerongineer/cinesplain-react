import axios, { AxiosResponse } from "axios";
import Movie from "../models/movie";
import Video from "../models/video";
import CastMember from "../models/castMember";
import Image, { Images } from "../models/Image";
import { getFormattedDate } from "./formatUtils";
import { getSubtractedDate } from "./timeUtils";
import { SECURE_BASE_IMAGE_URL } from "../constants/ImageSizes";

const retrieveData = async (url: string) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
        }
    };
    
    try {
        let response: AxiosResponse<any, any> = await axios.get(url, options);
        if (response.status !== 200) {
            return null;
        }
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveMovie = async (movieId: string | undefined) => {
    try {
        let res: string | null = await retrieveData(getMoviePath(movieId ? movieId : ""));
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

export const retrieveMovies = async (url: string) => {
    try {
        let res: string | null = await retrieveData(url);
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

export const retrievePopularMovieTitles = async (pages: number = 10) => {
    try {
        const popularMovieTitles: string[] = [];
        for (let page = 1; page <= pages; page++) {
            let res: string | null = await retrieveData(getPopularMoviesPath(page));
            if (res !== null) {
                const popularMoviesArray = JSON.parse(res).results;
                popularMoviesArray.forEach((resObj: any) => popularMovieTitles.push(resObj["title"]));
            }
        }
        return popularMovieTitles;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const retrieveVideos = (res: Object): Video[] => {
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

const retrieveImages = (res: Object): Image[] => {
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

const retrieveAllImages = (res: Object) => {
    const images: Images = {
        backdrops: [],
        logos: [],
        posters: []
    };
    // @ts-ignore
    images.backdrops = retrieveImages(res["backdrops"]);
    // @ts-ignore
    images.logos = retrieveImages(res["logos"]);
    // @ts-ignore
    images.posters = retrieveImages(res["posters"]);
    return images;
};

export const retrieveCredits = async (movieId: number) => {
    try {
        let res: string | null = await retrieveData(getMovieCastPath(movieId));
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

export const getMoviePath = (movieId: string) =>
    `${MOVIES_URL}movie/${movieId}?append_to_response=videos,images&language=en`;

export const getYouTubeTrailerPath = (videoKey: string) => `https://www.youtube.com/embed/${videoKey}`;

export const getMoviesSearchPath = (query: string, page: number, includeAdult: boolean = false) => (
    `${MOVIES_URL}search/movie?query=${query}&sort_by=popularity.desc&page=${page}&include_adult=${includeAdult}&language=en`
);
export const getPopularMoviesPath = (page: number, includeAdult: boolean = false) => (
    `${MOVIES_URL}discover/movie?sort_by=popularity.desc&page=${page}&include_adult=${includeAdult}&language=en`
);

const sixMonthsAgoFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, 6, 0));

export const getNowPlayingMoviesPath = () => `${MOVIES_URL}movie/now_playing?language=en-US&page=1`;
export const getHighestRatedMoviesPath = () => `${MOVIES_URL}discover/movie?include_adult=false&language=en-US&with_original_language=en&page=1&sort_by=vote_average.desc&primary_release_date.gte=${sixMonthsAgoFormatted}&without_genres=99,10755&vote_count.gte=20`;
export const getLowestRatedMoviesPath = () => `${MOVIES_URL}discover/movie?include_adult=false&language=en-US&with_original_language=en&page=1&sort_by=vote_average.asc&primary_release_date.gte=${sixMonthsAgoFormatted}&without_genres=99,10755&vote_count.gte=20`;
export const getUpcomingMoviesPath = () => `${getPopularMoviesPath(1)}&primary_release_date.gte=${getFormattedDate(
    new Date())}`;
export const getClassicMoviesPath = () => `${MOVIES_URL}discover/movie?include_adult=false&language=en-US&with_original_language=en&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=1000`;

export const getMovieCastPath = (movieId: number) => `${MOVIES_URL}movie/${movieId}/credits?language=en`;

const MOVIES_URL = "https://api.themoviedb.org/3/";