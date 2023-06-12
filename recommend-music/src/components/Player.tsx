
import React, { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons";
import ReactHowler from 'react-howler';

type Props = {
    musicUrl: string
}
const Player: React.FC<Props> = ({ musicUrl }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {


    }, [])
    const playingButton = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }
    return (
        <div className="component">
            <h2>Playing Now</h2>
            <img
                className="musicCover"
                src="https://picsum.photos/200/200"
            />
            <div>
                <h3 className="title">sampleTitle</h3>
                <p className="subTitle">sampleSubTitle</p>
            </div>
            <div>
                <ReactHowler
                    src='http://goldfirestudios.com/proj/howlerjs/sound.ogg'
                    playing={isPlaying}
                />
                <button className="playButton">
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}
                <button className="playButton">
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}
export default Player;