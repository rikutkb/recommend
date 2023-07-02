
import React, { useEffect, useState, useRef } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons";
import ReactHowler from 'react-howler';
import { Track } from "./Types";
import { Grid, Stack, Slider } from '@mui/material';
import { PlayCircle, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';

type Props = {
    musicID: string
}
const Player: React.FC<Props> = ({ musicID }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("https://p.scdn.co/mp3-preview/357a2b04e433ea648f5344a2916357d278974195.mp3");
    const [preview, setPreview] = useState("https://picsum.photos/200/200")
    const [track, setTrack] = useState<Track>();
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
            console.log(trackData);
            if (trackData !== undefined) {
                if (trackData.preview_url) {
                    console.log(`${trackData.preview_url.split("?")[0]}.mp3`)
                    setPreviewUrl(`${trackData.preview_url.split("?")[0]}.mp3`)
                    setTrack(trackData);
                    setPreview(trackData.album.images[0].url)
                }
            }
        })()

    }, [musicID])
    const playingButton = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }
    return (
        <>
            <Grid container>
                <Grid item xs={1}>
                    <img
                        className="musicCover"
                        src={preview}
                        width={60}
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
                        <div>
                            <Slider
                                size="small"
                                defaultValue={70}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                            />
                        </div>
                    </Stack>

                </Grid>
            </Grid>
        </>

    )
}
export default Player;