import React from 'react';
import './App.css';
import Header from './components/Header';
import { Grid, Stack } from '@mui/material';
import Contents from './components/Contents';
import Top from './components/Top';
import Callback from './components/Callback';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginFlagProvider } from './providers/loginProvider';
function App() {
  // const [playlist, setPlaylist] = useState<Playlist>();
  return (
    <div className="App">
      <Stack spacing={2}>
        <LoginFlagProvider>
          <Header></Header>
        </LoginFlagProvider>
        <Grid container spacing={1}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={10}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Top></Top>} />
                <Route path="/recommend" element={<Contents></Contents>}></Route>
                <Route path="/callback" element={<LoginFlagProvider><Callback></Callback></LoginFlagProvider>} />
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
