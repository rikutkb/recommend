import React from 'react';
import logo from './logo.svg';
import './App.css';
import test from './sample.json';
import Header from './components/Header';
import { Grid } from '@mui/material';
import Contents from './components/Contents';
function App() {
  // const [playlist, setPlaylist] = useState<Playlist>();
  return (
    <div className="App">
      <Header></Header>
      <Grid container spacing={1}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          <Contents></Contents>
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
