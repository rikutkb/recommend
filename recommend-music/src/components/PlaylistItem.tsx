import React from "react";

import { Track } from "./Types";

type Props = {
    track: Track
    handleClick: (track: Track) => void
}

const PlaylistItem: React.FC<Props> = ({track, handleClick})=>{
    return(
            <ul>
                <li>{track.name}</li>
                <li>{track.href}</li>
            </ul>
    )
}

export default PlaylistItem