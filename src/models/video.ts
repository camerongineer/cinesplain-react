class Video {
    private readonly _iso6391: string;
    private readonly _iso31661: string;
    private readonly _videoName: string;
    private readonly _videoKey: string;
    private readonly _publishedAt: string;
    private readonly _site: string;
    private readonly _size: number;
    private readonly _videoType: string;
    private readonly _official: boolean;
    private readonly _videoId: string;
    
    constructor(
        iso6391: string,
        iso31661: string,
        videoName: string,
        videoKey: string,
        publishedAt: string,
        site: string,
        size: number,
        videoType: string,
        official: boolean,
        videoId: string
    ) {
        this._iso6391 = iso6391;
        this._iso31661 = iso31661;
        this._videoName = videoName;
        this._videoKey = videoKey;
        this._publishedAt = publishedAt;
        this._site = site;
        this._size = size;
        this._videoType = videoType;
        this._official = official;
        this._videoId = videoId;
    }
    
    get iso6391(): string {
        return this._iso6391;
    }
    
    get iso31661(): string {
        return this._iso31661;
    }
    
    get videoName(): string {
        return this._videoName;
    }
    
    get videoKey(): string {
        return this._videoKey;
    }
    
    get publishedAt(): string {
        return this._publishedAt;
    }
    
    get site(): string {
        return this._site;
    }
    
    get size(): number {
        return this._size;
    }
    
    get videoType(): string {
        return this._videoType;
    }
    
    get official(): boolean {
        return this._official;
    }
    
    get videoId(): string {
        return this._videoId;
    }
    
    static objMap = {
        iso6391: "iso_639_1",
        iso31661: "iso_3166_1",
        videoName: "name",
        videoKey: "key",
        publishedAt: "published_at",
        site: "site",
        size: "size",
        videoType: "type",
        official: "official",
        videoId: "id"
    }
}

export default Video;