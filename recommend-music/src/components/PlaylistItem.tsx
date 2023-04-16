import React from "react";

import { Track } from "./Types";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';

type Props = {
    track: Track
    handleClick: (track: Track) => void
}

const PlaylistItem: React.FC<Props> = ({ track, handleClick }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={track.name} secondary={track.artists[0].name} />
        </ListItem>
    )
}

export default PlaylistItem