import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useDrawer } from './DrawerContext'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


const menuItems = [
  { text: 'Notes', icon: LightbulbOutlinedIcon },
  { text: 'Reminder', icon: NotificationsNoneOutlinedIcon },
  { text: 'Edit_Labels', icon: EditOutlinedIcon },
  { text: 'Archive', icon: ArchiveOutlinedIcon },
  { text: 'Trash', icon: DeleteOutlinedIcon },
];


export default function Sidebar() {
    const { open } = useDrawer();
    let drawerWidth = open?270:72,borderRadius='50px';
    const navigate=useNavigate();
    const handleclick=(text)=>{
      navigate(text==='Notes'?'/' : `/${text.toLowerCase()}`);
    }
    const  handlecolorclick=(index)=>{
      if(index===0){
        return '#feefc3';
      }
    }

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => {
              const isActive=location.pathname===`/${item.text.toLowerCase()}` || (item.text==='Notes' && location.pathname==='/')
             return( <ListItem
                key={item.text}
                disablePadding
                sx={{
                  backgroundColor: isActive ? '#feefc3' : 'transparent',
                  borderTopRightRadius: '50px',
                  borderBottomRightRadius: '50px',
                }}
                onClick={() => handlecolorclick(item.text)}
              >
                <ListItemButton onClick={() => handleclick(item.text)}>
                  <ListItemIcon sx={{ minWidth: 48 }}> {/* Better spacing for icons */}
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{display:open?'block':'none'}}  />
                </ListItemButton>
              </ListItem>
            )})}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
