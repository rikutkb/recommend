import React, { useState } from "react";
import PlaylistView from './Playlist';
import MusicPlotter from './MusicPlotter';
import { Grid, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ArtistsListView from './Artistslist';
import { LoginFlagProvider } from '../providers/loginProvider';
import Player from "./Player";

export default function Contents() {
    const [playlistID, setPlaylistID] = useState<string>("37i9dQZF1DXaJxsaI3czLL");
    const [artistID, setArtistID] = useState<string>("1snhtMLeb2DYoMOcVbb8iB")
    const [musicID, setMusicID] = useState<string>("2dUYxBbmtmNfanhSLbRcry")
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
                                <MenuItem value={"0"}>検索</MenuItem>
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
                    <Stack>
                        <MusicPlotter playlistID={playlistID} artistID={artistID} setMusicID={setMusicID} ></MusicPlotter>
                    </Stack>
                    <Stack>

                        <Player musicID={musicID}></Player>

                    </Stack>
                </Grid>

            </Grid>

        </Stack >

    );
}

