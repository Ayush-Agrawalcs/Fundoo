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
  const handlesubmit=(e)=>{
    let newError={};
    if(!formdata.email.endsWith('@gmail.com')){
      newError.email='Email must end with @gmail.com'
    }
    if(formdata.password.length<8){
      newError.password='Password must be at least 8 characters'
    }
    if(Object.keys(newError).length>0){
      setErrors(newError)
    }else{
      setErrors({})
      navigate('/');
    }
  }
  return (
    <div className='dt'>
      <Card sx={{ maxWidth: 1000 }}>
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
          <Box component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '52ch' } }}
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
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '55ch' } }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="password"
                name="password"
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
          onClick={handlesubmit}
        >
          Submit
        </Button>
        </div>
                  </CardActions>
      </Card>
    </div>
  );
}

export default SignIn
