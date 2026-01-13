import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';


import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

import { useDrawer } from './DrawerContext';

/* ===== Styled Components ===== */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
 backgroundColor: alpha(theme.palette.grey[300], 0.6),
'&:hover': {
  backgroundColor: alpha(theme.palette.grey[400], 0.8),
},
marginLeft: theme.spacing(15),
  marginRight: theme.spacing(6),
  width: 100,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 800,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const { toggleDrawer } = useDrawer()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#fff',
          color: '#000',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          <img
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            width={40}
            height={40}
            alt="Keep"
          />

          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', sm: 'block' }, ml: 1 }}
          >
            Keep
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              mx: { xs: 1, sm: 4 },
              maxWidth: { xs: '100%', sm: 800 },
              ml:20
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" />
            </Search>
          </Box>

          {/* DESKTOP ICONS */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton sx={{ ml: 30 }}><RefreshOutlinedIcon /></IconButton>
            <IconButton><GridViewOutlinedIcon /></IconButton>
            <IconButton><SettingsOutlinedIcon /></IconButton>
            <IconButton sx={{ ml: 10 }}><AppsOutlinedIcon /></IconButton>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <AccountCircle />
            </IconButton>
          </Box>

          {/* MOBILE MENU ICON */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}>
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* DESKTOP PROFILE MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
      </Menu>

      {/* MOBILE MENU */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        open={isMobileMenuOpen}
        onClose={() => setMobileMoreAnchorEl(null)}
      >
        <MenuItem>
          <IconButton><RefreshOutlinedIcon /></IconButton>
          Refresh
        </MenuItem>
        <MenuItem>
          <IconButton><GridViewOutlinedIcon /></IconButton>
          View
        </MenuItem>
        <MenuItem>
          <IconButton><SettingsOutlinedIcon /></IconButton>
          Settings
        </MenuItem>
        <MenuItem>
          <IconButton><AccountCircle /></IconButton>
          Profile
        </MenuItem>
      </Menu>
    </Box>
  )
}


