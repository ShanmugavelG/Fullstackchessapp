import React from 'react';
import Navbar from './Navbar';
import '../asserts/Tournment.css';

const Tournment = () => {
  return (
    <div>
      <Navbar />
    <div className="Tournment">
        <h1>Tournments:</h1>
      <div className="tournament-content">
        <h2>Not yet started</h2>
      </div>
    </div>
    </div>
  );
};

export default Tournment;
