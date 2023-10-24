class CastMember {
    private readonly _castMemberId: number;
    private readonly _castMemberName: string;
    private readonly _adult: boolean;
    private readonly _gender: number;
    private readonly _knownForDepartment: string;
    private readonly _originalName: string;
    private readonly _popularity: number;
    private readonly _profilePath: string;
    private readonly _castId: number;
    private readonly _character: string;
    private readonly _creditId: string;
    private readonly _order: number;
    
    constructor(
        castMemberId: number,
        castMemberName: string,
        adult: boolean,
        gender: number,
        knownForDepartment: string,
        originalName: string,
        popularity: number,
        profilePath: string,
        castId: number,
        character: string,
        creditId: string,
        order: number
    ) {
        this._castMemberId = castMemberId;
        this._castMemberName = castMemberName;
        this._adult = adult;
        this._gender = gender;
        this._knownForDepartment = knownForDepartment;
        this._originalName = originalName;
        this._popularity = popularity;
        this._profilePath = profilePath;
        this._castId = castId;
        this._character = character;
        this._creditId = creditId;
        this._order = order;
    }
    
    get castMemberId(): number {
        return this._castMemberId;
    }
    
    get castMemberName(): string {
        return this._castMemberName;
    }
    
    get adult(): boolean {
        return this._adult;
    }
    
    get gender(): number {
        return this._gender;
    }
    
    get knownForDepartment(): string {
        return this._knownForDepartment;
    }
    
    get originalName(): string {
        return this._originalName;
    }
    
    get popularity(): number {
        return this._popularity;
    }
    
    get profilePath(): string {
        return this._profilePath;
    }
    
    get castId(): number {
        return this._castId;
    }
    
    get character(): string {
        return this._character;
    }
    
    get creditId(): string {
        return this._creditId;
    }
    
    get order(): number {
        return this._order;
    }
    
    static objMap = {
        castMemberId: "id",
        castMemberName: "name",
        adult: "adult",
        gender: "gender",
        knownForDepartment: "known_for_department",
        originalName: "original_name",
        popularity: "popularity",
        profilePath: "profile_path",
        castId: "cast_id",
        character: "character",
        creditId: "credit_id",
        order: "order"
    }
}

export default CastMember;