import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';

type Props = {
  thema: any
}
const Header: React.FC<Props> = ({ thema }: Props) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={thema}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button color="inherit" href={'/recommend'}>Top</Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              Music Recommend
            </Typography>
            <Button color="inherit" href={'/help'}>Help</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
export default Header;