class Language {
    private readonly _englishName: string;
    private readonly _iso6391: string;
    private readonly _languageName: string;
    
    constructor(englishName: string, iso6391: string, languageName: string) {
        this._englishName = englishName;
        this._iso6391 = iso6391;
        this._languageName = languageName;
    }
    
    get englishName(): string {
        return this._englishName;
    }
    
    get iso6391(): string {
        return this._iso6391;
    }
    
    get languageName(): string {
        return this._languageName;
    }
    
    static objMap = {
        englishName: "english_name",
        iso6391: "iso_639_1",
        languageName: "name"
    }
}

export default Language;