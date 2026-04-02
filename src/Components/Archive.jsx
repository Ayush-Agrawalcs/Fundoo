import React, { useEffect, useState } from 'react'
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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { update, getArchieve } from '../Services/axiosNote';

function Archive() {
  const { open, click } = useDrawer();
  const user = JSON.parse(localStorage.getItem('user'));
  const [archived, setActived] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null);
  const colors = [
    "#fff", "#faafa8", "#f39f76", "#fff8b8", "#e2f6d3",
    "#b4ddd3", "#d4e4ed", "#aeccdc", "#d3bfdb", "#e9e3d4", "#efeff1"
  ];
  const userId = user?.id;
  useEffect(() => {
    if (!user)
      return;
    const fetchNotes = async () => {
      try {

        const res = await getArchieve(user)
        const data = await res.data;
        console.log(data)
        setActived(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, [userId]);



  const handelonclick = async (id) => {
    try {
      await fetch(`http://localhost:3000/Notes/${id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archieve: false }),
      })
      setActived(prev => prev.filter(note => note.id !== id));

      console.log('Archived note ID:', id);
    }
    catch (error) {
      console.log(error)
    }
  }


  const updateNote = async (index, field, value) => {
    setActived(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, [field]: value } : note
      )
    )
    const n = archived[index];
    if (!n)
      return;
    try {
      await update(n, { [field]: value });

    }
    catch (error) {
      console.log(error);
    }
  };

  const updateColor = async (index, color) => {
    setActived(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, bgcolor: color } : note
      )
    );
    const n = archived[index];
    if (!n)
      return;
    try {
      await update(n, { bgcolor: color });
    }
    catch (error) {
      console.log(error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleColorOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handelonclicke=async(id)=>{
        try {
      await fetch(`http://localhost:3000/Notes/${id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Trash: true }),
      })
      setActived(prev => prev.filter(note => note.id !== id));

      console.log('Archived note ID:', id);
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {click ?
        <Box>
          {archived.map((note, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: open ? '43.5%' : '37%',
                mt: 5,
                ml: open ? 70 : 50,
                p: 2,
                backgroundColor: note.bgcolor,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* TITLE */}
                <Box sx={{ display: 'flex' }}>
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
                    <ArchiveOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} onClick={() => handelonclick(note.id)} />
                  </Tooltip>

                  <Tooltip title='Delete'>
                    <DeleteOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} onClick={() => handelonclicke(note.id)} />
                  </Tooltip>

                  <Tooltip title="More options">
                    <MoreVertOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          ))}

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
                      updateColor(selectedIndex, color);
                      handleColorClose();
                    }}
                  />
                ))}
              </Box>
            </ClickAwayListener>
          </Popper>
        </Box> :
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            mt: 5,
            pr: 2,
          }}>
          {archived.map((note, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: open ? '60%' : '50%',
                mt: 5,
                ml: open ? 40 : 30,
                p: 2,
                backgroundColor: note.bgcolor,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* TITLE */}
                <Box sx={{ display: 'flex' }}>
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
                    <ArchiveOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} onClick={() => handelonclick(note.id)} />
                  </Tooltip>


                   <Tooltip title='Delete'>
                    <DeleteOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} onClick={() => handelonclicke(note.id)} />
                  </Tooltip>

                  <Tooltip title="More options">
                    <MoreVertOutlinedIcon sx={{ ml: 2, opacity: 0.5 }} />
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          ))}

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
                      updateColor(selectedIndex, color);
                      handleColorClose();
                    }}
                  />
                ))}
              </Box>
            </ClickAwayListener>
          </Popper>
        </Box>
      }
    </>
  )
}

export default Archive
