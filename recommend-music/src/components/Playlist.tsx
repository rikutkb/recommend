import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import List from '@mui/material/List';

import { Playlist, Track } from "./Types";

type Props = {
    //playlist: Playlist
    //fetchPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const PlaylistView: React.FC<Props> = ({ }) => {
    const [playlist, setPlaylist] = useState<Playlist>();
    const handleClick = (track: Track) => {
        console.log("----");
    }
    useEffect(() => {
        const fetchPlaylist = async () => {
            const response = await fetch("http://localhost:8080/playlist");
            const data: Playlist = await response.json();
            setPlaylist(data)
        }
        fetchPlaylist();

    }, [])
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                playlist && playlist.tracks.items.map((track) => (
                    <PlaylistItem key={track.track.id}
                        track={track.track}
                        handleClick={handleClick}></PlaylistItem>
                ))
            }
        </List>

    )
}


export default PlaylistView