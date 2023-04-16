import React from 'react';
import logo from './logo.svg';
import PlaylistView from './Playlist';
import { Grid } from '@mui/material';
export default function Contents() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <PlaylistView></PlaylistView>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    );
}

