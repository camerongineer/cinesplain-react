import Collection from "./collection.ts";
import Genre from "./genre.ts";
import Image from "./image.ts";
import ProductionCompany from "./productionCompany.ts";
import ProductionCountry from "./productionCountry.ts";
import SpokenLanguage from "./spokenLanguage.ts";
import Video from "./video.ts";

type Movie = {
    adult: boolean;
    backdropPath: string;
    belongsToCollection: Collection[] | null;
    budget: number | null;
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
    mediaType: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    productionCompanies: ProductionCompany[] | null;
    productionCountries: ProductionCountry[] | null;
    releaseDate: string;
    revenue: number | null;
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
};

export default Movie;