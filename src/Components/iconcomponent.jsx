import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextareaAutosize, Tooltip } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { addNote } from '../Services/axiosNote';

import { useDrawer } from './DrawerContext';

function IconComponent({ setcolor, setExpanded, setsaved }) {
  const { open } = useDrawer();
  const translateX = open ? 0 : -10;

  const [note, setNote] = useState({
    title: '',
    description: '',
    bgcolor: '#ffffff',
  });

  const colors = [
    '#FF5733',
    '#33CFFF',
    '#33FF57',
    '#FF33C5',
    '#ff8f33',
    '#77ba66',
    '#4242ef',
    '#b328aec8',
    '#c71d1d',
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleColorClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const changeColor = (color) => {
    setcolor(color); // UI color
    setNote(prev => ({ ...prev, bgcolor: color })); // save color
  };

  const handleClose = async() => {
  
    if (!note.title.trim() && !note.description.trim()) {
      setExpanded(false);
      return;
    }
    const currentuser=JSON.parse(localStorage.getItem('user'))
      const payload={
  title:note.title,
  description:note.description,
  bgcolor:note.bgcolor,
  userId:currentuser.id,
  archieve:false,
  Trash:false,
      }
try{
const res=await addNote(payload)
  const data=await res.data;
  console.log(data)
   setsaved(prev => {
      if (!prev.some(n => n.id === data.id)) return [...prev, data];
      return prev;
    });

    setNote({
      title: '',
      description: '',
      bgcolor: '#ffffff',
    });

    setcolor('#ffffff');
      setExpanded(false);
      setAnchorEl(null);
}
catch(error){
  console.log(error)
}

  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.3s ease',
          borderRadius: 1,
        }}
      >
        {/* Title */}
        <Box sx={{ display: 'flex' }}>
          <TextareaAutosize
            placeholder="Title"
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1.5rem',
              resize: 'none',
              backgroundColor: 'transparent',
            }}
            value={note.title}
            onChange={(e) =>
              setNote(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <PushPinOutlinedIcon sx={{ cursor: 'pointer',opacity:0.5 }} />
        </Box>

        {/* Description */}
        <TextareaAutosize
          placeholder="Take a note..."
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '1.2rem',
            resize: 'none',
            backgroundColor: 'transparent',
          }}
          value={note.description}
          onChange={(e) =>
            setNote(prev => ({ ...prev, description: e.target.value }))
          }
        />

        {/* Actions */}
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Tooltip title="Formatting options">
            <FormatColorTextOutlinedIcon sx={{ opacity: 0.5 }} />
          </Tooltip>

          <Tooltip title="Change color">
            <ColorLensOutlinedIcon
              sx={{ ml: 4, opacity: 0.5, cursor: 'pointer' }}
              onClick={handleColorClick}
            />
          </Tooltip>

          <Tooltip title="Remind me">
            <AddAlertOutlinedIcon sx={{ ml: 4, opacity: 0.5 }} />
          </Tooltip>

          <Tooltip title="Collaborator">
            <PersonAddAlt1OutlinedIcon sx={{ ml: 4, opacity: 0.5 }} />
          </Tooltip>

          <Tooltip title="Add image">
            <ImageOutlinedIcon sx={{ ml: 4, opacity: 0.5 }} />
          </Tooltip>

          <Tooltip title="Archive">
            <ArchiveOutlinedIcon sx={{ ml: 4, opacity: 0.5 }} />
          </Tooltip>

          <Tooltip title="More options">
            <MoreVertOutlinedIcon sx={{ ml: 4, opacity: 0.5 }} />
          </Tooltip>

          <Typography
            sx={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={handleClose}
          >
            Close
          </Typography>
        </Box>
      </Box>

      {/* 🎨 Color Picker */}
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Box
            sx={{
              display: 'flex',
              p: 1,
              bgcolor: 'white',
              boxShadow: 3,
              borderRadius: 1,
            }}
          >
            {colors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: color,
                  width: 30,
                  height: 30,
                  mx: 0.5,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                }}
                onClick={() => changeColor(color)}
              />
            ))}
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default IconComponent;
