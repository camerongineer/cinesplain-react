export interface Images {
    backdrops: Image[];
    logos: Image[];
    posters: Image[];
}

class Image {
    private readonly _aspectRatio: number;
    private readonly _height: number;
    private readonly _iso6391: string;
    private readonly _filePath: string;
    private readonly _voteAverage: number;
    private readonly _voteCount: number;
    private readonly _width: number;
    
    constructor(
        aspectRatio: number,
        height: number,
        iso6391: string,
        filePath: string,
        voteAverage: number,
        voteCount: number,
        width: number
    ) {
        this._aspectRatio = aspectRatio;
        this._height = height;
        this._iso6391 = iso6391;
        this._filePath = filePath;
        this._voteAverage = voteAverage;
        this._voteCount = voteCount;
        this._width = width;
    }
    
    get aspectRatio(): number {
        return this._aspectRatio;
    }
    
    get height(): number {
        return this._height;
    }
    
    get iso6391(): string {
        return this._iso6391;
    }
    
    get filePath(): string {
        return this._filePath;
    }
    
    get voteAverage(): number {
        return this._voteAverage;
    }
    
    get voteCount(): number {
        return this._voteCount;
    }
    
    get width(): number {
        return this._width;
    }
    
    static objMap = {
        aspectRatio: "aspect_ratio",
        height: "height",
        iso6391: "iso_639_1",
        filePath: "file_path",
        voteAverage: "vote_average",
        voteCount: "vote_count",
        width: "width"
    };
}

export default Image;