import React, { useState } from 'react';
import '../asserts/Signin.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({ firstName: "", lastName: "", email: "", pass: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const validate = () => {
    const { firstName, lastName, email, pass } = userdata;
    const emailRegex = /\S+@\S+\.\S+/;
    let isValid = true;

    if (firstName.trim() === "") {
      alert("First name is required.");
      isValid = false;
    }

    if (lastName.trim() === "") {
      alert("Last name is required.");
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      isValid = false;
    }

    if (pass.length < 6) {
      alert("Password must be at least 6 characters long.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log(userdata); 
      alert("Successfully Signed up");
      navigate('/Login');
    }
  };

  return (
    <div className='parent'>
      <div className='child'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}>
            <TextField
              helperText=""
              id="firstName"
              name="firstName"
              label="First Name"
              value={userdata.firstName}
              onChange={handleChange}
            />
            <TextField
              helperText=""
              id="lastName"
              name="lastName"
              label="Last Name"
              value={userdata.lastName}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}>
            <TextField
              helperText="Enter a valid email or phone"
              id="email"
              name="email"
              label="Email or Phone number"
              value={userdata.email}
              onChange={handleChange}
            />
            <TextField
              helperText="Create a strong password"
              id="pass"
              name="pass"
              label="Password"
              type="password"
              value={userdata.pass}
              onChange={handleChange}
            />
          </Box>
          <br />
          <Button variant='contained' type="submit">Sign Up</Button>
          <br />
          <Button onClick={() => navigate('/Login')}>Already have an account?</Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
