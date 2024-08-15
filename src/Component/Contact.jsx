import React, { useState } from 'react';
import { TextField, Autocomplete, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../asserts/Contact.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  const [userdata, setUserdata] = useState({ email: "", number: "", message: "" });

  const Profession = [
    { label: 'Beginner' },
    { label: 'Intermediate' },
    { label: 'Professional' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata({ ...userdata, [name]: value });
  };

  const validate = () => {
    const { email, number, message } = userdata;
    const emailRegex = /\S+@\S+\.\S+/;
    const numberRegex = /^[0-9]{10}$/;
    let isValid = true;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      isValid = false;
    }

    if (!numberRegex.test(number)) {
      alert("Enter a correct 10-digit mobile number.");
      isValid = false;
    }

    if (message.trim() === "") {
      alert("Enter your message.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const formData = new FormData(event.target);
    formData.append("access_key", "fab6bbdc-7459-4210-a6cc-5acbfa0f8a9d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      alert('Form Submitted Successfully');
      setUserdata({ email: "", number: "", message: "" });
    }
  };

  return (
    <div className='ContactWh'>
      <Navbar />
      <div className='Contact'>
        <div className='Contact-item'>
          <h1>Contact us</h1>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              <TextField
                helperText="Please enter your email"
                label='Email'
                name='email'
                onChange={handleChange}
                value={userdata.email}
                fullWidth
                required
              />
              <TextField
                helperText="Mobile number"
                label='Number'
                name='number'
                onChange={handleChange}
                value={userdata.number}
                fullWidth
                required
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Profession}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Level" />}
                required
              />
              <TextField
                id='filled-multiline-flexible'
                label='Message'
                name='message'
                multiline
                maxRows={3}
                variant='outlined'
                onChange={handleChange}
                value={userdata.message}
                fullWidth
                required
              />
              <Button endIcon={<SendIcon />} type="submit">
                Send
              </Button>
            </Box>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
