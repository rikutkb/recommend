import React from 'react';
import PlaylistView from './Playlist';
import MusicChart from './MusicChart';
import { Grid, Stack } from '@mui/material';
import ArtistsListView from './Artistslist';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
export default function Contents() {
    return (
        <Stack spacing={1}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <PlaylistView></PlaylistView>
                </Grid>
                <Grid item xs={3}>
                    <ArtistsListView></ArtistsListView>
                </Grid>
                <Grid item xs={6}>
                    <MusicChart></MusicChart>
                </Grid>
            </Grid>
            <Grid>
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </Grid>
        </Stack>

    );
}

