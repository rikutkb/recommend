import React from 'react';
import './App.css';
import Header from './components/Header';
import { Grid, Stack } from '@mui/material';
import Contents from './components/Contents';
import Callback from './components/Callback';
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {
  // const [playlist, setPlaylist] = useState<Playlist>();
  return (
    <div className="App">
      <Stack spacing={2}>
        <Header></Header>
        <Grid container spacing={1}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={10}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Contents></Contents>}/>
                <Route path="/callback" element={<Callback></Callback>}/>
              </Routes>
            </BrowserRouter>
          </Grid>
          <Grid item xs={1}>
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default App;
