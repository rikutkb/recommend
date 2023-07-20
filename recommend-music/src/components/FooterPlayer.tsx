
import React, { useEffect, useState, useRef } from "react";
import { IconContext } from "react-icons";
import ReactHowler from 'react-howler';
import { Track } from "./Types";
import { Grid, Stack, Slider } from '@mui/material';
import { PlayCircle, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';


type Props = {
    musicID: string
}

const useAnimationFrame = (isRunning: boolean, callback = () => { }) => {
    const reqIdRef = useRef<number | null>(null);
    const loop = React.useCallback(() => {
        if (isRunning) {
            reqIdRef.current = requestAnimationFrame(loop);
            callback();
        }
    }, [isRunning, callback]);
    React.useEffect(() => {
        reqIdRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(reqIdRef.current!);
    }, [loop]);
};

const Player: React.FC<Props> = ({ musicID }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("https://p.scdn.co/mp3-preview/357a2b04e433ea648f5344a2916357d278974195.mp3");
    const [preview, setPreview] = useState("https://picsum.photos/200/200")
    const [track, setTrack] = useState<Track>();
    const [player, setPlayer] = useState<any>(null);
    const [duration, setDuration] = useState(30.0);
    const [seek, setSeek] = useState(0.0);
    const updateSeekPos = React.useCallback(() => {
        if (player !== null) {
            setSeek(player.seek());
        }
    }, [player]);
    useAnimationFrame(isPlaying, updateSeekPos);

    useEffect(() => {
        const fetchTrack = async (id: string): Promise<Track | undefined> => {
            const response = await fetch(`${process.env.REACT_APP_PROXY_PATH}/v1/track?trackID=${id}`);
            if (response.status === 200) {
                const data: Track = await response.json();
                return data;
            } else {
                return undefined;
            }
        }
        (async () => {
            const trackData = await fetchTrack(musicID);
            if (trackData !== undefined) {
                if (trackData.preview_url) {
                    setPreviewUrl(`${trackData.preview_url.split("?")[0]}.mp3`)
                    setTrack(trackData);
                    setPreview(trackData.album.images[0].url);
                }
            }
        })()

    }, [musicID])
    const playingButton = () => {
        setDuration(player.duration());
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);

        }

    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") {
            setSeek(newValue);
            player.seek(newValue);
        }
    }
    const formatMusicValue = (value: number) => {
        return Math.floor(value * 10) / 10;
    }

    // マウント終了後にdurationをセット
    return (
        <>
            <Grid container>
                <Grid item xs={1}>
                    <img
                        className="musicCover"
                        src={preview}
                        width={60}
                        alt="preview"
                    />
                </Grid>
                <Grid item xs={2}>
                    <h3 className="title">{track?.name}</h3>
                    <p className="artist">{track?.artists[0].name}</p>
                </Grid>
                <Grid item xs={6}>
                    <Stack>
                        <div>
                            <ReactHowler
                                src={previewUrl}
                                playing={isPlaying}
                                volume={0.01}
                                ref={(ref) => (setPlayer(ref))}
                            />
                            <button className="playButton">
                                <IconContext.Provider value={{ size: "3em", color: "#1976d2" }}>
                                    <SkipPrevious sx={{ fontSize: "3em" }} />
                                </IconContext.Provider>
                            </button>
                            {!isPlaying ? (
                                <button className="playButton" onClick={playingButton}>
                                    <PlayCircle sx={{ fontSize: "3em" }}></PlayCircle>
                                </button>
                            ) : (
                                <button className="playButton" onClick={playingButton}>
                                    <Pause sx={{ fontSize: "3em" }}></Pause>
                                </button>
                            )}
                            <button className="playButton">
                                <SkipNext sx={{ fontSize: "3em" }} />
                            </button>
                        </div>
                        <Grid container>
                            <Grid item xs={1}>{formatMusicValue(seek)}</Grid>
                            <Grid item xs={10}>
                                <Slider
                                    size="small"
                                    aria-label="Small"
                                    value={seek}
                                    max={duration}
                                    step={0.1}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item xs={1}>{formatMusicValue(duration)}</Grid>

                        </Grid>
                    </Stack>

                </Grid>
            </Grid>
        </>

    )
}
export default Player;