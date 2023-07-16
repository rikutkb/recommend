import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FooterPlayer from './FooterPlayer';
import { ThemeProvider } from '@mui/material/styles';
type Props = {
  thema: any
}

const Footer: React.FC<Props> = ({ thema }: Props) => {
  const [musicID, setMusicID] = useState<string>("2dUYxBbmtmNfanhSLbRcry");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={thema}>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>
            <FooterPlayer musicID={musicID}></FooterPlayer>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
export default Footer;