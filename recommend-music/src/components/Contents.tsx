import React, { useState } from "react";
import PlaylistView from './Playlist';
import MusicPlotter from './MusicPlotter';
import { Grid, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ArtistsListView from './Artistslist';
import { LoginFlagProvider } from '../providers/loginProvider';

export default function Contents() {
    const [playlistID, setPlaylistID] = useState<string>("37i9dQZF1DXaJxsaI3czLL");
    const [artistID, setArtistID] = useState<string>("1snhtMLeb2DYoMOcVbb8iB")
    return (
        <Stack spacing={1}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Grid item xs={3}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={0}
                            >
                                <MenuItem value={"0"}>全てのプレイリスト</MenuItem>
                                <MenuItem value={"1"}>マイプレイリスト</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <LoginFlagProvider>
                            <PlaylistView setPlaylistID={setPlaylistID}></PlaylistView>
                        </LoginFlagProvider>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <ArtistsListView setArtistID={setArtistID}></ArtistsListView>
                </Grid>
                <Grid item xs={6}>
                    <MusicPlotter playlistID={playlistID} artistID={artistID} ></MusicPlotter>
                </Grid>
            </Grid>
        </Stack >

    );
}

