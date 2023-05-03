import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import List from '@mui/material/List';

import { Playlist, Track ,Playlists,Tracks} from "./Types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

type Props = {
    //playlist: Playlist
    //fetchPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const PlaylistView: React.FC<Props> = () => {
    const [tracks, setTracks] = useState<Tracks>({} as Tracks);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    //const [selectedPlayList, setSelectedPlayList] = useState<Playlist>({} as Playlist);
    const [inputValue, setInputValue] = React.useState('');
    const handleClick = (track: Track) => {
        console.log("----");
    }
    const fetchPlaylists = async () => {
        const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/api/playlists`);
        const data: Playlists = await response.json();
        console.log(data.playlists.items)
        setPlaylists(data.playlists.items)
        console.log(playlists)
        playlists.map((playlist) => console.log(playlist.name))
    }
    const fetchPlaylist = async (id:string) => {
        if(id !== ""){
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/api/playlists/${id}`);
            const data: Playlist = await response.json();
            console.log(data.tracks)
            setTracks(data.tracks)
        }
    }
    useEffect(() => {
        fetchPlaylists();
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Stack spacing={1}>
            <Autocomplete
                onChange={(event, item) => {
                    if(item !== null){
                        //setSelectedPlayList(item);
                        fetchPlaylist(item.id);
                    }
                  }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={playlists}
                sx={{ width: 200 }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="プレイリスト" />}
            />
            <List sx={{
                width: '100%',
                maxWidth: 200,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 }
            }}>
                {
                    Array.isArray(tracks.items) ? tracks.items.map((track) => (
                        <PlaylistItem key={track.track.id}
                            track={track.track}
                            handleClick={handleClick}></PlaylistItem>
                    )):null
                }
            </List>
        </Stack>



    )
}


export default PlaylistView