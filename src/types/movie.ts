import Collection from "./collection.ts";
import Genre from "./genre.ts";
import Image from "./image.ts";
import ProductionCompany from "./productionCompany.ts";
import ProductionCountry from "./productionCountry.ts";
import SpokenLanguage from "./spokenLanguage.ts";
import Video from "./video.ts";

type Movie = {
    actors: string | null;
    adult: boolean;
    awards: string | null;
    backdropPath: string;
    belongsToCollection: Collection | null;
    boxOffice: string | null;
    budget: number | null;
    director: string | null;
    genres: Genre[] | null;
    genreIds: number[] | null;
    homepage: string | null;
    id: string;
    images: {
        backdrops: Image[] | null,
        logos: Image[] | null,
        posters: Image[] | null
    }
    imdbId: string | null;
    imdbRating: number | null;
    metaScore: number | null;
    mediaType: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string | null;
    popularity: number;
    posterPath: string | null;
    productionCompanies: ProductionCompany[] | null;
    productionCountries: ProductionCountry[] | null;
    rated: string | null;
    releaseDate: string | null;
    revenue: number | null;
    rottenTomatoesScore: number | null;
    runtime: number | null;
    spokenLanguages: SpokenLanguage[] | null;
    status: string | null;
    tagline: string | null;
    title: string;
    video: boolean;
    videos: {
        results: Video[] | null
    };
    voteAverage: number;
    voteCount: number;
    writer: string | null;
};

export default Movie;