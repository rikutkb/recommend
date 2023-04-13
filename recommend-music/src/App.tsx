import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistView from './components/Playlist';
import test from './sample.json';
function App() {
 // const [playlist, setPlaylist] = useState<Playlist>();
  return (
    <div className="App">
      <PlaylistView ></PlaylistView>
    </div>
  );
}

export default App;
