import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { MusicPlots, MusicPlot, Track } from "./Types";
type Props = {
    playlistID: string
    artistID: string
    setMusicID: React.Dispatch<React.SetStateAction<string>>
}

const COLORS = ['red', 'blue', '#FFBB28', '#FF8042', 'red', 'pink'];

const MusicPlotter: React.FC<Props> = ({ playlistID, artistID, setMusicID }: Props) => {
    const [musicPlots, setMusicPlots] = useState<MusicPlots>();
    const [playlistMusic, setPlaylistMusic] = useState<MusicPlot[]>();
    const [artistMusic, setArtistMusic] = useState<MusicPlot[]>();

    useEffect(() => {
        const fetchMusicPlots = async () => {
            if (artistID !== "" && playlistID !== "") {
                const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/pca?playlistID=${playlistID}&artistID=${artistID}`);
                if (response.status === 200) {
                    const data: MusicPlots = await response.json();
                    setMusicPlots(data)
                    setPlaylistMusic(data.plots.filter(plot => plot.is_playlist))
                    setArtistMusic(data.plots.filter(plot => !plot.is_playlist))
                }
            }
        }
        fetchMusicPlots();
    }, [artistID, playlistID])
    const selectMusic = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        const values = (event.currentTarget as SVGElement).getAttribute('values');
        if (values !== null) {
            setMusicID(values);
        }
    }

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

            <Scatter name="プレイリスト" data={playlistMusic} fill={COLORS[0]}>
                {
                    playlistMusic && playlistMusic.map((entry, index) => (
                        < Cell name={entry.name} key={`cell-${index}`} fill={COLORS[0]} />
                    ))
                }
            </Scatter>
            <Scatter name="アーティストの楽曲" data={artistMusic} fill={COLORS[1]}>
                {
                    artistMusic && artistMusic.map((entry, index) => (
                        < Cell name={entry.name} key={`cell-${index}`} fill={COLORS[1]} values={entry.id} onClick={selectMusic} />
                    ))
                }
            </Scatter>
        </ScatterChart>

    )
}


export default MusicPlotter