import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { MusicPlots } from "./Types";
type Props = {
    //playlist: Playlist
    //fetchPlaylist: React.Dispatch<React.SetStateAction<Playlist>>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const MusicChart: React.FC<Props> = () => {
    const [musicPlots, setMusicPlots] = useState<MusicPlots>();
    useEffect(() => {
        const fetchMusicPlots = async () => {
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/api/musicchart`);
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
            <XAxis type="number" dataKey="x" name="stature" unit="-" />
            <YAxis type="number" dataKey="y" name="weight" unit="-" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={musicPlots?.plots} fill="#8884d8">
                {
                musicPlots && musicPlots.plots.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
                }
            </Scatter>
        </ScatterChart>

    )
}


export default MusicChart