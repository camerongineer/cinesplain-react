class ProductionCountry {
    private readonly _iso31661: string;
    private readonly _countryName: string;
    
    constructor(iso31661: string, countryName: string) {
        this._iso31661 = iso31661;
        this._countryName = countryName;
    }
    
    get iso31661(): string {
        return this._iso31661;
    }
    
    get countryName(): string {
        return this._countryName;
    }
    
    static objMap = {
        iso31661: "iso_3166_1",
        countryName: "name"
    }
}

export default ProductionCountry;