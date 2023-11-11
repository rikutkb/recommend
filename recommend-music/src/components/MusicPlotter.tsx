import React, { useEffect, useState, useContext } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts';
import { MusicPlots, MusicPlot } from "./Types";
import { PlayingContext, PlayingInfoContext } from "../providers/playerProvider";
type Props = {
    playlistID: string
    artistID: string
}

const COLORS = ['red', 'blue', '#FFBB28', '#FF8042', 'red', 'pink'];

const MusicPlotter: React.FC<Props> = ({ playlistID, artistID }: Props) => {
    const [playlistMusic, setPlaylistMusic] = useState<MusicPlot[]>();
    const [artistMusic, setArtistMusic] = useState<MusicPlot[]>();
    // eslint-disable-next-line
    const [_playingContext, setContext] = useContext(PlayingInfoContext);

    useEffect(() => {
        const fetchMusicPlots = async () => {
            if (artistID !== "" && playlistID !== "") {
                const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/pca?playlistID=${playlistID}&artistID=${artistID}`);
                if (response.status === 200) {
                    const data: MusicPlots = await response.json();
                    setPlaylistMusic(data.plots.filter(plot => plot.is_playlist));
                    setArtistMusic(data.plots.filter(plot => !plot.is_playlist));
                } else {
                    console.error("音声データが存在しません。")
                }
            }
        }
        fetchMusicPlots();
    }, [artistID, playlistID])
    const selectMusic = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        const values = (event.currentTarget as SVGElement).getAttribute('values');
        if (values !== null) {
            setContext({ musicID: values } as PlayingContext);
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
                        < Cell name={entry.name} key={`cell-${index}`} fill={COLORS[0]} values={entry.id} onClick={selectMusic} />
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