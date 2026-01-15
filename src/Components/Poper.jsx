import React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ClickAwayListener from '@mui/material/ClickAwayListener';



function Poper({ anchorEl, onClose }) {
  const open = Boolean(anchorEl);


  const googlePopupButtonStyle = {
  height: 52,
  bgcolor:"white",                    
  borderRadius: "999px 16px 16px 999px", 
  textTransform: "none",
  fontWeight: 500,
  borderColor: "#dadce0",
  color: "#3c4043",
  "&:hover": {
    backgroundColor: "#f1f3f4",
    borderColor: "#dadce0",
  },
};
  const googlePopupButtonStyle2 = {
  height: 52,
  bgcolor:"white",                    
  borderRadius: "16px 999px 999px 16px", 
  textTransform: "none",
  fontWeight: 500,
  borderColor: "#dadce0",
  color: "#3c4043",
  "&:hover": {
    backgroundColor: "#f1f3f4",
    borderColor: "#dadce0",
  },
};

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      disablePortal
    >
      <ClickAwayListener onClickAway={onClose}>
        <Card
          sx={{

            width: 320,
            height: 250,
            mt: 5,
            p: 2,
            borderRadius: 3,
            boxShadow: 4,
            bgcolor:"#e6f7ff"
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Avatar
              sx={{
                bgcolor: 'orange',
                width: 64,
                height: 64,
                fontSize: 32,
              }}
            >
              A
            </Avatar>
          </Box>

          <Typography align="center" variant="h6">
            Hi, Ayush!
          </Typography>
          <Typography align="center" variant="body2" color="text.secondary">
            agrawal06ayush@gmail.com
          </Typography>

          <Divider sx={{ my: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <Button fullWidth variant="outlined" sx={googlePopupButtonStyle}>
            Add account
          </Button>
          <Button fullWidth variant="outlined" sx={googlePopupButtonStyle2}>
            Sign out
          </Button>
          </div>
        </Card>
      </ClickAwayListener>
    </Popper>
  );
}

export default Poper;
