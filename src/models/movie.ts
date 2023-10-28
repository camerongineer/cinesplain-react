import Genre from "./genre";
import Collection from "./collection";
import ProductionCompany from "./productionCompany";
import ProductionCountry from "./productionCountry";
import Language from "./language";
import Video from "./video";
import CastMember from "./castMember";
import { Images } from "./Image";

class Movie {
    private readonly _adult: boolean;
    private readonly _backdropPath: string;
    private readonly _belongsToCollection: Collection[];
    private readonly _budget: number;
    private _credits: CastMember[] | undefined;
    private readonly _genres: Genre[];
    private readonly _images: Images;
    private readonly _imdbId: string;
    private readonly _movieId: number;
    private readonly _movieTitle: string;
    private readonly _originalLanguage: string;
    private readonly _originalTitle: string;
    private readonly _overview: string;
    private readonly _popularity: number;
    private readonly _posterPath: string;
    private readonly _productionCompanies: ProductionCompany[];
    private readonly _productionCountries: ProductionCountry[];
    private readonly _releaseDate: string;
    private readonly _revenue: number;
    private readonly _runtime: number;
    private readonly _spokenLanguages: Language[];
    private readonly _status: string;
    private readonly _tagline: string;
    private readonly _video: boolean;
    private readonly _videos: Video[];
    private readonly _voteAverage: number;
    private readonly _voteCount: number;
    
    constructor (
        adult: boolean,
        backdropPath: string,
        belongsToCollection: Collection[],
        budget: number,
        genres: Genre[],
        images: Images,
        imdbId: string,
        movieId: number,
        movieTitle: string,
        originalLanguage: string,
        originalTitle: string,
        overview: string,
        popularity: number,
        posterPath: string,
        productionCompanies: ProductionCompany[],
        productionCountries: ProductionCountry[],
        releaseDate: string,
        revenue: number,
        runtime: number,
        spokenLanguages: Language[],
        status: string,
        tagline: string,
        video: boolean,
        videos: Video[],
        voteAverage: number,
        voteCount: number
    ) {
        this._adult = adult;
        this._backdropPath = backdropPath;
        this._belongsToCollection = belongsToCollection;
        this._budget = budget;
        this._genres = genres;
        this._images = images;
        this._imdbId = imdbId;
        this._movieId = movieId;
        this._movieTitle = movieTitle;
        this._originalLanguage = originalLanguage;
        this._originalTitle = originalTitle;
        this._overview = overview;
        this._popularity = popularity;
        this._posterPath = posterPath;
        this._productionCompanies = productionCompanies;
        this._productionCountries = productionCountries;
        this._releaseDate = releaseDate;
        this._revenue = revenue;
        this._runtime = runtime;
        this._spokenLanguages = spokenLanguages;
        this._status = status;
        this._tagline = tagline;
        this._video = video;
        this._videos = videos;
        this._voteAverage = voteAverage;
        this._voteCount = voteCount;
    }
    
    get adult (): boolean {
        return this._adult;
    }
    
    get backdropPath (): string {
        return this._backdropPath;
    }
    
    get belongsToCollection (): Collection[] {
        return this._belongsToCollection;
    }
    
    get budget (): number {
        return this._budget;
    }
    
    get credits (): CastMember[] {
        return this._credits ? this._credits : [];
    }
    
    set credits (value: CastMember[] | undefined) {
        this._credits = value;
    }
    
    get genres (): Genre[] {
        return this._genres;
    }
    
    get images (): Images {
        return this._images;
    }
    
    get imdbId (): string {
        return this._imdbId;
    }
    
    get movieId (): number {
        return this._movieId;
    }
    
    get movieTitle (): string {
        return this._movieTitle;
    }
    
    get originalLanguage (): string {
        return this._originalLanguage;
    }
    
    get originalTitle (): string {
        return this._originalTitle;
    }
    
    get overview (): string {
        return this._overview;
    }
    
    get popularity (): number {
        return this._popularity;
    }
    
    get posterPath (): string {
        return this._posterPath;
    }
    
    get productionCompanies (): ProductionCompany[] {
        return this._productionCompanies;
    }
    
    get productionCountries (): ProductionCountry[] {
        return this._productionCountries;
    }
    
    get releaseDate (): string {
        return this._releaseDate;
    }
    
    get revenue (): number {
        return this._revenue;
    }
    
    get runtime (): number {
        return this._runtime;
    }
    
    get spokenLanguages (): Language[] {
        return this._spokenLanguages;
    }
    
    get status (): string {
        return this._status;
    }
    
    get tagline (): string {
        return this._tagline;
    }
    
    get video (): boolean {
        return this._video;
    }
    
    get videos (): Video[] {
        return this._videos;
    }
    
    get voteAverage (): number {
        return this._voteAverage;
    }
    
    get voteCount (): number {
        return this._voteCount;
    }
    
    static objMap = {
        adult: "adult",
        backdropPath: "backdrop_path",
        belongsToCollection: "belongs_to_collection",
        budget: "budget",
        genres: "genres",
        imdbId: "imdb_id",
        images: "images",
        movieId: "id",
        movieTitle: "title",
        originalLanguage: "original_language",
        originalTitle: "original_title",
        overview: "overview",
        popularity: "popularity",
        posterPath: "poster_path",
        productionCompanies: "production_companies",
        productionCountries: "production_countries",
        releaseDate: "release_date",
        revenue: "revenue",
        runtime: "runtime",
        spokenLanguages: "spoken_languages",
        status: "status",
        tagline: "tagline",
        video: "video",
        videos: "videos",
        voteAverage: "vote_average",
        voteCount: "vote_count"
    };
}

export default Movie;
