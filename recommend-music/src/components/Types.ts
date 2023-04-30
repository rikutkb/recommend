export interface Music {
    id: string,
    title: string
}

export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string; ean: string; upc: string };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
export interface Image {
    url: string;
    height: number | null;
    width: number | null;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    total_tracks: number;
}

export interface Artist {
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}
export interface Artists{
    artists:{
        items: Artist[]
        href: string;
        limit: number;
        offset: number;
        next: string;
        previous: string;
        total: number;
    }

}
export interface Tracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
        added_at: string;
        is_local: boolean;
        track: Track;
    }[];
}
export interface Playlists{
    playlists: {
        href: string;
        items: Playlist[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    }
}

export interface Playlist {
    collaborative: boolean;
    description: string;
    href: string;
    id: string;
    images: Image[];
    name: string;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
}


export interface MusicPlot {
    x: number;
    y: number;
    label: {
        track: {
            id: string;
            name: string;
        }
    }
};

export interface MusicPlots {
    plots: MusicPlot[];
}

