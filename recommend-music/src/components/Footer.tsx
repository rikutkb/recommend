import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FooterPlayer from './FooterPlayer';
import { ThemeProvider } from '@mui/material/styles';
import { PlayingInfoContext } from "../providers/playerProvider";
type Props = {
  thema: any
}

const Footer: React.FC<Props> = ({ thema }: Props) => {
  const [context] = useContext(PlayingInfoContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={thema}>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>
            {context.musicID ? < FooterPlayer musicID={context.musicID}></FooterPlayer> : <></>}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box >
  );
}
export default Footer;