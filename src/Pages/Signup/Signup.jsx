import React,{use, useState} from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { Box as MuiBox } from '@mui/material';
import TextField from '@mui/material/TextField';

import signupImage from '../../assets/signup.jpeg'
import './signup.css'
import Home from '../../DashBoard/Home.jsx';
import { useNavigate,Link } from 'react-router-dom';

function Signup() {
  const navigate=useNavigate();
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
    const [errors, setErrors] = useState({})

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  localStorage.setItem('userData', JSON.stringify(formData));
  let newErrors = {}
  if (!formData.firstName.match(/^[A-Za-z]{2,}$/)) {
    newErrors.firstName = 'Enter a valid first name'
  }
  if (!formData.lastName.match(/^[A-Za-z]{2,}$/)) {
    newErrors.lastName = 'Enter a valid last name'
  }
  if (!formData.email.endsWith('@gmail.com')) {
    newErrors.email = 'Email must end with @gmail.com'
  }
  if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
  } else {
    setErrors({});
    navigate('/');
  }
}

  return (
    <div className="dt">
      <Card sx={{ width: { xs: '90%', sm: 600, md: 800, lg: 900 }, display: { xs: 'block', sm: 'flex' } }}>
        <form onSubmit={handleSubmit}>
        {/* LEFT SIDE - CONTENT */}
        <div className="content">
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' ,color:'#1976d2',paddingLeft: 1 }} component="div">
              Fundoo
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{fontWeight:'bold', color:'black', fontSize:'30px',paddingLeft: 1}}>
              Create your Fundoo account
            </Typography>

             <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: { xs: '100%', sm: '25ch' } } ,paddingBottom: 3}}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
        helperText={errors.firstName}
        />
        <TextField
         label="last Name"
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
  error={errors.lastName}
  helperText={errors.lastName}
        />
      </div>
      </Box>
      <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: { xs: '100%', sm: '52ch' } }}}
      noValidate
      autoComplete="off"
      >
      <div>
        <TextField
        label="Your email address"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  helperText={errors.email}
        />
        <Typography variant="body2" color="text.secondary" sx={{color:'black', fontSize:'15px',paddingLeft: 1,paddingBottom: 3}}>
              use only letters,numbers & periods
            </Typography>
      </div>
      </Box>
      <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: { xs: '100%', sm: '25ch' } } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        label="password"
  name="password"
  type="password"
  value={formData.password}
  onChange={handleChange}
  error={errors.password}
  helperText={errors.password}
        />
        <TextField
        label="Confirm password"
  name="confirmPassword"
  type="password"
  value={formData.confirmPassword}
  onChange={handleChange}
  error={errors.confirmPassword}
  helperText={errors.confirmPassword}
        />
      </div>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ color:'black', fontSize:'15px' ,paddingLeft: 1,paddingBottom: 3}}>
            use 8 or more characters with a mix of letters, numbers & <br />symbols
            </Typography>
            </CardContent>

          <CardActions>
            <Button size="small" sx={{paddingLeft: 2}} component={Link} to="/signin">Sign in Instead</Button>
            <div className='but'>
          <Button
  size="large"
  variant="contained"
  sx={{
    width: 160,
    height: 48,
    textTransform: 'none',
  }}
  type="submit"
>
  Submit
</Button>
</div>
          </CardActions>
        </div>
        </form>
        <MuiBox className="dm" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <CardMedia
          component="img"
          sx={{
    width: { xs: 200, sm: 250 },
    objectFit: 'contain',
    padding: 2
  }}
          image={signupImage}
          alt="Signup"
        />
         <Typography variant="body2" color="text.secondary" sx={{ color:'black', fontSize:'15px', paddingRight: 6 }}>
            One account .All of Fundoo working for you
            </Typography>
        </MuiBox>
      </Card>
    </div>
  )
}

export default Signup
