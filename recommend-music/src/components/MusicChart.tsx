import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { MusicPlots } from "./Types";
type Props = {
    //playlist: Playlist
    //fetchPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const COLORS = ['red', 'blue', '#FFBB28', '#FF8042', 'red', 'pink'];

const MusicChart: React.FC<Props> = () => {
    const [musicPlots, setMusicPlots] = useState<MusicPlots>();
    const [playlistID, setPlaylistID] = useState<string>("37i9dQZF1DXaJxsaI3czLL");
    const [artistID, setArtistID] = useState<string>("1snhtMLeb2DYoMOcVbb8iB")
    useEffect(() => {
        const fetchMusicPlots = async () => {
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/pca?playlistID=${playlistID}&artistID=${artistID}`);
            const data: MusicPlots = await response.json();
            setMusicPlots(data)
            console.log(data);

        }
        fetchMusicPlots();

    }, [])
    return (
        <ScatterChart
            width={400}
            height={400}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="x" unit="-" />
            <YAxis type="number" dataKey="y" name="y" unit="-" />
            <ZAxis type="category" dataKey="name" name="楽曲名" unit="" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={musicPlots?.plots} fill="#8884d8">
                {
                    musicPlots && musicPlots.plots.map((entry, index) => (
                        < Cell name={entry.name} key={`cell-${index}`} fill={entry.is_playlist ? COLORS[0] : COLORS[1]} />
                    ))
                }
            </Scatter>
        </ScatterChart>

    )
}


export default MusicChart