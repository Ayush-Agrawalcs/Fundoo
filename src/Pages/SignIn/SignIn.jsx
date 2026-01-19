import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  {useNavigate,Link} from 'react-router-dom';
import './signIn.css'
import api from '../../Services/axiosservice';

function SignIn() {
  const navigate=useNavigate()
  const [formdata,setFormdata]=useState({
    email:'',
    password:''
  })
  const [errors,setErrors]=useState({});
  const handlechange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }
const handlesubmit = async (e) => {
  e.preventDefault();
  let newError = {};

  const email = formdata.email.trim();
  const password = formdata.password.trim();

  if (!email.endsWith('@gmail.com')) {
    newError.email = 'Email must end with @gmail.com';
  }

  if (password.length < 8) {
    newError.password = 'Password must be at least 8 characters';
  }

  if (Object.keys(newError).length > 0) {
    setErrors(newError);
    return; // ⛔ IMPORTANT
  }

  try {
    const res = await api.get(
      `/Employee?email=${email}&password=${password}`
    );

    if (res.data.length === 1) {
      localStorage.setItem("user", JSON.stringify(res.data[0]));
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className='dt'>
      <Card sx={{ maxWidth: { xs: '90%', sm: 600, md: 800, lg: 1000 } }}>
        <form onSubmit={handlesubmit}>
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', paddingLeft: 1 }} component="div">
            Fundoo
          </Typography>
          <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold', color: 'black', paddingLeft: 1 }} component="div">
            Sign in
          </Typography>
          <Typography gutterBottom variant="h6" sx={{ color: 'black', paddingLeft: 1,opacity:0.4 }} component="div">
            to continue to Fundoo
          </Typography>
          <Box
            sx={{ '& .MuiTextField-root': { m: 1, width: { xs: '100%', sm: '52ch' } } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Your email address"
                name="email"
                value={formdata.email}
                onChange={handlechange}
                error={errors.email}
                helperText={errors.email}
              />
              <Typography variant="body2" color="text.secondary" sx={{ color: 'black', fontSize: '15px', paddingLeft: 1, paddingBottom: 3,opacity:0.4 }}>
                use only letters,numbers & periods
              </Typography>
            </div>
          </Box>
          <Box
            sx={{ '& .MuiTextField-root': { m: 1, width: { xs: '100%', sm: '55ch' } } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="password"
                name="password"
                type="password"
                value={formdata.password}
                onChange={handlechange}
                error={errors.password}
                helperText={errors.password}
              />
               <Typography variant="body2" color="text.secondary" sx={{color:'black', fontSize:'15px',paddingLeft: 1,paddingBottom: 3,opacity:0.4}}>
              use only letters,numbers & periods
            </Typography>
            </div>
          </Box>
        </CardContent>
                  <CardActions>
                    <Button size="small" sx={{paddingLeft: 2}} component={Link} to="/signup">Back to Sign Up?</Button>
                    <div className='but'>
                  <Button
          size="large"
          variant="contained"
          sx={{
            width: 160,
            height: 48,
            textTransform: 'none'
          }}
          type="submit"
        >
          Submit
        </Button>
        </div>
                  </CardActions>
        </form>
      </Card>
    </div>
  );
}

export default SignIn
