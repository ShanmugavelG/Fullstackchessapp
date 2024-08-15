// src/components/AdminLogin.js
import React, { useState, useContext } from 'react';
import { Box, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { LoginContext } from './LoginContext';
import { AuthContext } from './AuthContext';
import './LoginContext'
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const {toggleLoginType } = useContext(LoginContext);
  const [userdata, setUserdata] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const validate = () => {
    const { email, password } = userdata;
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

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (validate()) {
  //     try {
  //       const em = userdata.email;
  //       const pass = userdata.password;
  //       const emailexist = ldata.findIndex((user) => user.email === em);
  //       if (emailexist === -1) {
  //         alert("Invalid Email");
  //       } else if (emailexist !== -1 && ldata[emailexist].pass === pass) {
  //         alert("Welcome Head!!!");
  //         navigate('/AdminHome'); 
  //       } else {
  //         alert("Incorrect password");
  //       }
  //     } catch (error) {
  //       console.error("There was an error logging in!", error);
  //     }
  //   }
  // };
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:8091/admin/login",userdata);
        console.log(response);
        if(response.status===200)
        {
          login('admin');
          navigate("/AdminHome");
        }
        else{
          alert("Wrong email or password");
        }
      } catch (error) {
        alert("wrong email or pass");
        console.error("There was an error logging in!", error);
      }
    }
  };
  return (
    <div className='parent'>
      <div className='parent-top-login'>CHESS ARCADE - Admin</div>
      <div className='child'>
        <h1>Admin Login</h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            helperText="Please enter your Email or Phone"
            label='Email'
            name='email'
            onChange={handleChange}
            value={userdata.email}
            fullWidth
          />
          <TextField
            helperText="Please enter your password"
            label='Password'
            type='password'
            name='password'
            onChange={handleChange}
            value={userdata.password}
            fullWidth
          />
        </Box>
        <Button variant="contained" onClick={handleSubmit}>Login</Button>
        <br />
        <br />
        <Button onClick={toggleLoginType}>
          Switch to User Login
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
