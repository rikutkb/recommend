import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import List from '@mui/material/List';

import { Artist, Artists } from "./Types";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

const options = ['あいみょん', 'artists'];
type Props = {
    //playlist: Playlist
    //fetchPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const ArtistsListView: React.FC<Props> = ({ }) => {
    const [artistsList, setArtists] = useState<Artists>();
    const [value, setValue] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const handleClick = (track: Artist) => {
        console.log("----");
    }
    useEffect(() => {
        const fetchArtists = async () => {
            const response = await fetch("http://localhost:8080/api/artists");
            console.log(response)
            const data: Artists = await response.json();
            setArtists(data)
        }
        fetchArtists();

    }, [])
    return (
        <Stack spacing={1}>
            <TextField id="outlined-search" label="Artists field" type="search" 
                sx={{ width: 200 }}/>
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
                    artistsList && artistsList.artists.items.map((artist) => (

                        <ListItem key={artist.id}>
                            <ListItemAvatar>
                                <Avatar src={artist.images[0]?.url} />

                            </ListItemAvatar>
                            <ListItemText primary={artist.name} secondary={artist.genres} />
                        </ListItem>
                    ))
                }
            </List>
        </Stack>



    )
}


export default ArtistsListView