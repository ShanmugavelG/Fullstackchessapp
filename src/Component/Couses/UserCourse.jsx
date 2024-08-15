import React, { useState, useContext, useEffect } from 'react';
import { CourseContext } from './CourseContext';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import './UserCourse.css';
import { getCourses } from '../../axios';
import { AuthContext } from '../Login/AuthContext';

const UserCourse = () => {
  const { courses, setCourses } = useContext(CourseContext);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const { email } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  // Payment state
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Error state for validation
  const [errors, setErrors] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [setCourses]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8091/api/users/getbyEmail", {
          params: { email },
        });
        setUser(response.data);
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [email]);

  const handleClickEnroll = (course) => {
    setSelectedCourse(course);
    setCourseId(course.courseId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
    setErrors({ ...errors, [name]: false }); // Reset error when user starts typing
  };

  const validatePaymentDetails = () => {
    const { cardNumber, expiryDate, cvv } = paymentDetails;
    let isValid = true;
    let newErrors = { cardNumber: false, expiryDate: false, cvv: false };

    // Basic validation rules
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = true;
      isValid = false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = true;
      isValid = false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate payment details
    if (!validatePaymentDetails()) {
      return; // Stop submission if validation fails
    }

    // Implement payment gateway logic here (e.g., using Stripe, PayPal)
    try {
      // Placeholder for payment processing
      console.log('Processing payment...', paymentDetails);

      // Once payment is successful, proceed with course enrollment
      await axios.patch("http://localhost:8091/api/users/updateUserCourse", null, {
        params: { userId, courseId }
      });

      // Fetch updated user data after successful enrollment
      const response = await axios.get("http://localhost:8091/api/users/getbyEmail", {
        params: { email },
      });
      setUser(response.data); // Update user state with new data
      handleClose();
    } catch (error) {
      alert("You can only enroll for 3 courses")
      console.error('Error submitting form:', error);
    }
  };

  if (!user) {
    return (<div>Loading...</div>);
  }

  const isEnrolled = (courseId) => {
    if (user && user.courses) {
      return user.courses.some((course) => course.courseId === courseId);
    }
    return false;
  };

  return (
    <div className="mainuser-courses-container">
      <h1>Available Courses</h1>
      <ul className="maincourse-list">
        {courses.map((course) => (
          <li key={course.courseId} className="maincourse-item">
            <div className="maincourse-title">{course.title}</div>
            <div className="maincourse-description">
              <b>Rs.{course.description}</b>
              {course.mentor.length > 0 ? (
                <div>
                  <b>Mentor Name: {course.mentor[0].mentorName}</b><br />
                </div>
              ) : (
                <p>No mentor assigned</p>
              )}
            </div>
            <div className="maincourse-img-container">
              <img className="maincourse-img" src={course.img} alt="course icon" />
            </div>
            <Button
              className="enroll-button"
              variant="contained"
              color={isEnrolled(course.courseId) ? "secondary" : "primary"}
              onClick={() => isEnrolled(course.courseId) ? null : handleClickEnroll(course)}
              disabled={isEnrolled(course.courseId)}
            >
              {isEnrolled(course.courseId) ? "Enrolled" : "Enroll"}
            </Button>
          </li>
        ))}
      </ul>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "black" }}>Enroll in <br />{selectedCourse?.title}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} className="payment-form">
            <Typography variant="h6">Course Details</Typography>
            <b>Course Content:</b> {selectedCourse?.content} <br /><br />
            <b>"Cost of course":Rs.</b> {selectedCourse?.description}
            {selectedCourse?.mentor.length > 0 ? (
              <div>
                <b>Mentor Name: {selectedCourse?.mentor[0].mentorName}</b><br />
                <b>Mentor Rating: {selectedCourse?.mentor[0].rating}</b><br />
              </div>
            ) : (
              <p>No mentor assigned</p>
            )}

            <div className="payment-form">
              <Typography variant="h6">Payment Details</Typography>
              <TextField
                label="Card Number"
                name="cardNumber"
                variant="outlined"
                fullWidth
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                required
                margin="normal"
                error={errors.cardNumber}
                helperText={errors.cardNumber ? "Invalid card number" : ""}
              />
              <TextField
                label="Expiry Date (MM/YY)"
                name="expiryDate"
                variant="outlined"
                fullWidth
                value={paymentDetails.expiryDate}
                onChange={handlePaymentChange}
                required
                margin="normal"
                error={errors.expiryDate}
                helperText={errors.expiryDate ? "Invalid expiry date" : ""}
              />
              <TextField
                label="CVV"
                name="cvv"
                variant="outlined"
                fullWidth
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                required
                margin="normal"
                error={errors.cvv}
                helperText={errors.cvv ? "Invalid CVV" : ""}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Pay & Enroll
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserCourse;
