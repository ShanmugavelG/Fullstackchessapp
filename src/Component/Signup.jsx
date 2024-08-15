import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { postalldata } from '../axios'; // Ensure this path is correct
import '../asserts/Signin.css';

const Signup = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({ firstname: "", lastname: "", email: "", password: "", date: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const validate = () => {
    const { firstname, lastname, email, password } = userdata;
    const emailRegex = /\S+@\S+\.\S+/;
    let isValid = true;

    if (firstname.trim() === "" || firstname.length <= 3) {
      alert("First name is required and its length must be greater than 3.");
      isValid = false;
    }
    if (lastname.trim() === "") {
      alert("Last name is required.");
      isValid = false;
    }

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
  
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  userdata.date=formattedDate;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
       await postalldata(userdata);
          alert("Hello!!! " + userdata.firstname + " Thanks for choosing us");
        navigate('/UserLogin');
      } catch (error) {
        // alert("email already exists");  
        console.error("There was an error signing up!", error);
      }
    }
  };


  return (
    <div className='parent'>
      <div className='parent-top-login'>CHESS ARCADE</div>
      <div className='child'>
        <h1>Sign Up</h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            helperText="Please enter your First Name"
            label="First Name"
            name='firstname'
            onChange={handleChange}
            value={userdata.firstName}
            fullWidth
          />
          <TextField
            helperText="Please enter your Last Name"
            label="Last Name"
            name='lastname'
            onChange={handleChange}
            value={userdata.lastName}
            fullWidth
          />
          <TextField
            helperText="Please enter your Email"
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
            value={userdata.pass}
            fullWidth
          />
        </Box>
        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <br />
        <Button onClick={() => navigate('/UserLogin')}>Login</Button>
      </div>
    </div>
  );
};

export default Signup;
