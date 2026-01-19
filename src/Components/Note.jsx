import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import IconComponent from './iconcomponent';
import { useDrawer } from './DrawerContext'
import AddNote from './AddNote';
import ListNote from './ListNote';
import { useNavigate } from 'react-router-dom';


function Note() {
  const { open, click } = useDrawer();
  const [saved, setsaved] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [color, setcolor] = useState('#ffffff');
  const navigate = useNavigate();
  const handleclick = async () => {
    setExpanded(true);
  }
  const drawerWidth = open ? 70 : 50;
  // const drawert=open?
  const currentid = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!currentid) {
      navigate('/signin');
      return;
    }
    let valid = true;
    const fetchNotes = async () => {
      try {
        const res = await fetch(`http://localhost:3000/Notes?userId=${currentid.id}&archieve=false&Trash=false`);
        const data = await res.json();
        console.log("--",data);
        if (valid) {
          setsaved(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();

    return () => {
      valid = false;
    };
  }, [currentid.id, navigate]);


  const handelonclick = async (id) => {
    try {
      await fetch(`http://localhost:3000/Notes/${id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archieve: true }),
      })
      setsaved(prev => prev.filter(note => note.id !== id));

      console.log('Archived note ID:', id);
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', '& .MuiPaper-root': { width: open ? '69%' : '50%', height: '100%' }, ml: drawerWidth, mt: 5, flexDirection: 'row' }}>
        <Paper elevation={3} sx={{ p: 2, width: '70%', bgcolor: color }} >
          {!expanded ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Take a note..."
                style={{
                  width: '80%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.2rem',
                  resize: 'none'
                }}
                onClick={handleclick}
              />

              <CheckBoxOutlinedIcon />
              <BrushOutlinedIcon sx={{ ml: 2 }} />
              <ImageOutlinedIcon sx={{ ml: 2 }} />
            </Box>
          ) : (
            <IconComponent setcolor={setcolor} scolors={color} setExpanded={setExpanded} setsaved={setsaved} saved={saved} />
          )}
        </Paper>
      </Box>
      {console.log(saved)};
      {click ?
        <AddNote saved={saved} setsaved={setsaved} handleclick={handelonclick} /> :
        <ListNote saved={saved} setsaved={setsaved} />
      }
    </>
  )
}

export default Note
