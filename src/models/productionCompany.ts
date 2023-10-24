class ProductionCompany {
    private readonly _companyId: number;
    private readonly _logoPath: string;
    private readonly _companyName: string;
    private readonly _originCountry: string;
    
    constructor(companyId: number, logoPath: string, companyName: string, originCountry: string) {
        this._companyId = companyId;
        this._logoPath = logoPath;
        this._companyName = companyName;
        this._originCountry = originCountry;
    }
    
    get companyId(): number {
        return this._companyId;
    }
    
    get logoPath(): string {
        return this._logoPath;
    }
    
    get companyName(): string {
        return this._companyName;
    }
    
    get originCountry(): string {
        return this._originCountry;
    }
    
    static objMap = {
        companyId: "id",
        logoPath: "logo_path",
        companyName: "name",
        originCountry: "origin_country"
    }
}

export default ProductionCompany;