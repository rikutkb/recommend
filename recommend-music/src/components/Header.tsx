import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  function logout() {
    localStorage.clear();
    const spotifyLogoutWindow = window.open('https://www.spotify.com/logout/', 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() => spotifyLogoutWindow?.close(), 2000)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" href={'/recommend'}>Top</Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            Music Recommend
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
          <Button color="inherit" href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&scope=user-read-private+user-top-read&redirect_uri=${process.env.REACT_APP_HOST}/callback`}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}