import React from 'react';
import '../asserts/NavEnter.css';
import { Typography, Container, Grid, Box } from '@mui/material';
import { Button } from '@mui/material';
import back from '../images/back.jpg';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const HomeContent = () => {
  const navigate = useNavigate();
  return (
    <div className='wholesome'>
      <Container className="main-content">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} className="slide-in-left">
            <h2 className="main-title">Welcome to the "CHESS ARCADE"</h2>
            <br />
            <p className="main-subtitle">
              OUR Academy began as Silver Knights when a pair of brothers who grew up loving chess wanted to share their enthusiasm with kids.
              After ten years teaching chess at hundreds of schools, we partnered with Magnus Carlsen, the world chess champion, to grow the game!
              We'd be excited to have your child join our online academy, where kids ages 5-14 from 49 states and 30+ countries come to learn, have FUN,
              and play chess!
            </p>
            <Box className="button-group">
              <Button variant="contained" className="start-button" onClick={() => navigate('/Login')}>Get Started to enjoy </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="slide-in-right">
            <img src={back} alt="Educational GIF" className="main-gif" />
          </Grid>
        </Grid>
      </Container>
      <div className="features">
        <p style={{ textAlign: 'center', fontSize: '60px', fontStyle: 'bold',marginBottom:'0px' }}>
          Gist
        </p>
        <Container className="features-section slide-in-bottom">
          <Grid container spacing={10}>
            <Grid item xs={10} md={3}>
              <Box className="feature-box">
                <Typography variant="h5">Beginner <br />Chess Course</Typography>
                <Box className="feature-box-content">
                  <Typography variant="body1">Duration: 8 weeks
                    Overview: This course covers the basics of chess, including the rules, piece movements, and simple strategies to get you started</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="feature-box">
                <Typography variant="h5">Intermediate <br />Chess Course</Typography>
                <Box className="feature-box-content">
                  <Typography variant="body1">Duration: 12 weeks
                    Overview: Designed for players who know the basics, this course dives into more complex strategies, tactics, and game analysis.</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="feature-box">
                <Typography variant="h5">Advanced <br />Chess Course</Typography>
                <Box className="feature-box-content">
                  <Typography variant="body1">
                    Duration: 16 weeks
                    Overview: For seasoned players, this course focuses on advanced tactics, opening repertoires, and endgame techniques.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="feature-box">
                <Typography variant="h5">Kids' <br />Chess Course</Typography>
                <Box className="feature-box-content">
                  <Typography variant="body1">Duration: 10 weeks
                    Overview: Tailored for children aged 6-12, this course makes learning chess fun and engaging, promoting cognitive and social skills.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="testimonials">
        <Container className="testimonials-section">
          <Typography variant="h4" className="testimonials-title">What Our Students Say</Typography><br></br>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="testimonial-box">
                <Typography variant="body1">"The courses are amazing and my chess skills have improved significantly. The instructors are fantastic!"</Typography>
                <Typography variant="body2" className="testimonial-author">- Alex</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="testimonial-box">
                <Typography variant="body1">"I love the online academy. It's fun and I get to learn with kids from all over the world."</Typography>
                <Typography variant="body2" className="testimonial-author">- Maria</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="testimonial-box">
                <Typography variant="body1">"The advanced chess course helped me compete at a higher level. Highly recommend!"</Typography>
                <Typography variant="body2" className="testimonial-author">- James</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div><Footer /></div>
    </div>
  );
}

export default HomeContent;
