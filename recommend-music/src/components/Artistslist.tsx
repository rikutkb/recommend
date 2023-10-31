import React, { useEffect, useState } from "react";
import List from '@mui/material/List';

import { Artists } from "./Types";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

type Props = {
    setArtistID: React.Dispatch<React.SetStateAction<string>>
}

const ArtistsListView: React.FC<Props> = ({ setArtistID }: Props) => {
    const [artistsList, setArtists] = useState<Artists>();
    const [searchArtistName, setSearchArtistName] = useState<string>("");
    useEffect(() => {
        const fetchArtists = async () => {
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/search?q=${searchArtistName}`);
            const data: Artists = await response.json();
            setArtists(data)
        }
        fetchArtists();

    }, [searchArtistName])
    return (
        <Stack spacing={1}>
            <TextField
                id="outlined-search"
                label="Artists field"
                type="search"
                value={searchArtistName}
                onChange={e => setSearchArtistName(e.target.value)}
                sx={{ width: 200 }} />
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

                        <ListItem key={artist.id} onClick={() => { setArtistID(artist.id) }}>
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

export default ArtistsListView;
