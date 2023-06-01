import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { MusicPlots } from "./Types";
type Props = {
    playlistID: string
    artistID: string
}

const COLORS = ['red', 'blue', '#FFBB28', '#FF8042', 'red', 'pink'];

const MusicPlot: React.FC<Props> = ({ playlistID, artistID }: Props) => {
    const [musicPlots, setMusicPlots] = useState<MusicPlots>();
    useEffect(() => {
        const fetchMusicPlots = async () => {
            if (artistID !== "" && playlistID !== "") {
                const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/pca?playlistID=${playlistID}&artistID=${artistID}`);
                if (response.status === 200) {
                    const data: MusicPlots = await response.json();
                    setMusicPlots(data)
                }
            }
        }
        fetchMusicPlots();
    }, [artistID, playlistID])

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
            <Legend verticalAlign="top" height={36} />
            <XAxis type="number" dataKey="x" unit="-" />
            <YAxis type="number" dataKey="y" unit="-" />
            <ZAxis type="category" dataKey="name" name="楽曲名" unit="" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

            <Scatter name="プレイリスト" data={musicPlots?.plots.filter(plot => plot.is_playlist)} fill={COLORS[0]}>
                {
                    musicPlots && musicPlots.plots.map((entry, index) => (
                        < Cell name={entry.name} key={`cell-${index}`} fill={COLORS[0]} />
                    ))
                }
            </Scatter>
            <Scatter name="アーティストの楽曲" data={musicPlots?.plots.filter(plot => !plot.is_playlist)} fill={COLORS[1]}>
                {
                    musicPlots && musicPlots.plots.map((entry, index) => (
                        < Cell name={entry.name} key={`cell-${index}`} fill={COLORS[1]} />
                    ))
                }
            </Scatter>
        </ScatterChart>

    )
}


export default MusicPlot