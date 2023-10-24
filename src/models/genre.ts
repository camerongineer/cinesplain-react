class Genre {
    private readonly _genreId: string;
    private readonly _genreName: string;
    
    constructor (
        genreId: string,
        genreName: string
    ) {
        this._genreId = genreId;
        this._genreName = genreName;
    }
    
    get genreId (): string {
        return this._genreId;
    }
    
    get name (): string {
        return this._genreName;
    }
    
    static objMap = {
        genreId: "id",
        genreName: "name"
    }
}

export default Genre;