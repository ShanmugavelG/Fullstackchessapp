import React from 'react';
import '../asserts/NavEnter.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from '../asserts/logo.png';
import HomeContent from './HomeContent';


const NavEnter = () => {
  const navigate = useNavigate();

  const Login = () => {
    navigate('/UserLogin');
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <img src={logo} alt="CHESS ARCHADE" />
        </div>
        {/* <div className="navbar-logo">CHESS ARCHADE</div> */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Button variant="outlined" onClick={Login}>Login/Signup</Button>
          </li>
        </ul>
      </nav>
      <div>
        <HomeContent/>
      </div>

    </div>
  );
};

export default NavEnter;
