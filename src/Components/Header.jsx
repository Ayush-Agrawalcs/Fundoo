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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#ffffff', color: '#000000' }}
      >
        <Toolbar sx={{ position: 'relative' }}>
          {/* Left section */}
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          <img
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            style={{ width: 40, height: 40 }}
          />

          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', sm: 'block' }, ml: 1 }}
          >
            Keep
          </Typography>

          {/* Centered Search */}
          <Box
            sx={{
              position: 'absolute',
              left: '35%',
              transform: 'translateX(-50%)',
              width: { xs: '70%', sm: '50%', md: 600 },

            }}
          >
            <Search sx={{ width: '100%' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <RefreshOutlinedIcon />
            </IconButton>

            <IconButton size="large" color="inherit">
              <GridViewOutlinedIcon />
            </IconButton>

            <IconButton size="large" color="inherit">
              <SettingsOutlinedIcon />
            </IconButton>

            <IconButton size="large" color="inherit" sx={{ ml: 2 }}>
              <AppsOutlinedIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </Box>
  );
}

