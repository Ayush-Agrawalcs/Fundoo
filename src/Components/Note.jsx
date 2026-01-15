import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import IconComponent from './iconcomponent';    


function Note() {
  const [expanded, setExpanded] = useState(false);
  const handleclick=()=>{
    setExpanded(true);
  }
  return (
   <Box
  sx={{display:'flex', '& .MuiPaper-root': {width:'70%', height:'100%'},ml:70,mt:5, flexDirection:'row'}}>
  <Paper elevation={3} sx={{ p: 2, width: '70%' }}>
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
      <IconComponent />
    )}
  </Paper>
</Box>
  )
}

export default Note
