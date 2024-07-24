
import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../asserts/Login.css';
import { useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';


const Login = () => {
  const navigate=useNavigate();
  const [userdata,setUserdata]=useState({email:"",password:""})
  const handlechange=(event)=>
  {
    const{name, value} =event.target;
    setUserdata({...userdata,[name] : value});

  }
  const validate = () => {
    const {email, password } = userdata;
    const emailRegex = /\S+@\S+\.\S+/;
    let isValid = true;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      isValid = false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log(userdata); 
      alert("Successfully Logged in");
      navigate('/Login');
    }
  };

  return (
    <div className='parent'>
    <div className='child'>
      <h1>Login</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          helperText={"Please enter your Email or Phone"}
          label='Email'
          name='email'
          onChange={handlechange}
          value={(userdata.email)}
        />
        <TextField
          helperText={"Please enter your password"}
          label='Password'
          type='password'
          name='password'
          onChange={handlechange}
          value={(userdata.password)}
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
      <br />
      <Button onClick={() => navigate('/Signup')}>Create a new account</Button>
    </div>
  </div>
  )
}

export default Login
