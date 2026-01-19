import React, { useState } from 'react';
import { TextareaAutosize, Tooltip } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useDrawer } from './DrawerContext';

function ListNote({ saved, setsaved }) {
  const { open } = useDrawer();

  const colors = [
    "#fff", "#faafa8", "#f39f76", "#fff8b8", "#e2f6d3",
    "#b4ddd3", "#d4e4ed", "#aeccdc", "#d3bfdb", "#e9e3d4", "#efeff1"
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const updateNote = (index, field, value) => {
    setsaved(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, [field]: value } : note
      )
    );
  };

  const updateColor = (index, color) => {
    setsaved(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, bgcolor: color } : note
      )
    );
  };

  const handleColorOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveIndex(index);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };

  return (
    <>
      {/* NOTES GRID */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mt: 5,
          ml: open ? 50 : 20,
          pr: 2,
        }}
      >
        {saved.map((note, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: note.bgcolor,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* TITLE */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextareaAutosize
                  value={note.title}
                  onChange={(e) =>
                    updateNote(index, 'title', e.target.value)
                  }
                  placeholder="Title"
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.2rem',
                    resize: 'none',
                    backgroundColor: 'transparent',
                    fontWeight: 600,
                  }}
                />
                <PushPinOutlinedIcon sx={{ opacity: 0.5 }} />
              </Box>

              {/* DESCRIPTION */}
              <TextareaAutosize
                value={note.description}
                onChange={(e) =>
                  updateNote(index, 'description', e.target.value)
                }
                placeholder="Take a note..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  resize: 'none',
                  backgroundColor: 'transparent',
                  marginTop: 16,
                }}
              />

              {/* ICON BAR */}
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Tooltip title="Formatting options">
                  <FormatColorTextOutlinedIcon sx={{ opacity: 0.5 }} />
                </Tooltip>

                <Tooltip title="Change color">
                  <ColorLensOutlinedIcon
                    sx={{ ml: 2, opacity: 0.5, cursor: 'pointer' }}
                    onClick={(e) => handleColorOpen(e, index)}
                  />
                </Tooltip>

                <Tooltip title="Remind me">
                  <AddAlertOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                </Tooltip>

                <Tooltip title="Collaborator">
                  <PersonAddAlt1OutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                </Tooltip>

                <Tooltip title="Add image">
                  <ImageOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                </Tooltip>

                <Tooltip title="Archive">
                  <ArchiveOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                </Tooltip>

                <Tooltip title="More options">
                  <MoreVertOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* COLOR PICKER */}
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleColorClose}>
          <Box
            sx={{
              display: 'flex',
              p: 1,
              bgcolor: 'white',
              boxShadow: 3,
              borderRadius: 1,
            }}
          >
            {colors.map((color, i) => (
              <Box
                key={i}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: color,
                  cursor: 'pointer',
                  mx: 0.5,
                  border: '1px solid #ccc',
                }}
                onClick={() => {
                  updateColor(activeIndex, color);
                  handleColorClose();
                }}
              />
            ))}
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

export default ListNote;
