class Collection {
    private readonly _collectionId: number;
    private readonly _collectionName: string;
    private readonly _posterPath: string;
    private readonly _backdropPath: string;
    
    constructor(collectionId: number, collectionName: string, posterPath: string, backdropPath: string) {
        this._collectionId = collectionId;
        this._collectionName = collectionName;
        this._posterPath = posterPath;
        this._backdropPath = backdropPath;
    }
    
    get collectionId(): number {
        return this._collectionId;
    }
    
    get collectionName(): string {
        return this._collectionName;
    }
    
    get posterPath(): string {
        return this._posterPath;
    }
    
    get backdropPath(): string {
        return this._backdropPath;
    }
    
    static objMap = {
        collectionId: "id",
        collectionName: "name",
        posterPath: "poster_path",
        backdropPath: "backdrop_path"
    }
}

export default Collection;