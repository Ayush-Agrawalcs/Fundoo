import Recat, { useEffect, useState } from 'react'
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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useDrawer } from './DrawerContext';
import { getTrash } from '../Services/axiosNote';

function Trash() {
  const { click, open } = useDrawer();
  const user = JSON.parse(localStorage.getItem('user'));
  const [archived, setActived] = useState([])
  const userId = user?.id;
  useEffect(() => {
    if (!user)
      return;
    const fetchNotes = async () => {
      try {
        const res = await getTrash(user)
        const data = await res.data;
        setActived(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchNotes();
  }, [userId]);



  const handleclickd = async (id) => {
    try {
      await fetch(`http://localhost:3000/Notes/${id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Trash: false }),
      })
      setActived(prev => prev.filter(note => note.id !== id));

      console.log('Archived note ID:', id);
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleclicked = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/Notes/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setActived(prev => prev.filter(note => note.id !== id));
      console.log("Deleted note ID:", id);
    } catch (error) {
      console.error(error);
    }
  };



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
                ml: open ? 60 : 50,
                p: 2,
                backgroundColor: note.bgcolor,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* TITLE */}
                <Box sx={{ display: 'flex' }}>
                  <TextareaAutosize
                    value={note.title}
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
                <Box sx={{ display: 'flex', mt: 3 }}>
                  <Tooltip title="Restore">
                    <DeleteOutlinedIcon sx={{ opacity: 0.5 }} onClick={() => handleclickd(note.id)} />
                  </Tooltip>

                  <Tooltip title="Delete Forever">
                    <DeleteForeverIcon sx={{ ml: 2, opacity: 0.5 }} onClick={() => handleclicked(note.id)} />
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box> :
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
          {archived.map((note, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: open ? '80%' : '80%',
                mt: 5,
                p: 2,
                backgroundColor: note.bgcolor,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* TITLE */}
                <Box sx={{ display: 'flex' }}>
                  <TextareaAutosize
                    value={note.title}
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
                <Box sx={{ display: 'flex', mt: 3 }}>
                  <Tooltip title="Restore">
                    <DeleteOutlinedIcon sx={{ opacity: 0.5 }} onClick={() => handleclickd(note.id)} />
                  </Tooltip>

                  <Tooltip title="Delete Forever">
                    <DeleteForeverIcon sx={{ ml: 2, opacity: 0.5 }} onClick={() => handleclicked(note.id)} />
                  </Tooltip>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>}
    </>
  )
}

export default Trash
