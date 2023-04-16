import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistView from './components/Playlist';
import test from './sample.json';
import Header from './components/Header';
function App() {
 // const [playlist, setPlaylist] = useState<Playlist>();
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
