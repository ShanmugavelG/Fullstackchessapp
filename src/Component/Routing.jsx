// src/components/Routing.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChessRouting from '../Chess/ChessRouting';
import About from './About';
import Contact from './Contact';
import Courses from './Courses';
import Home from './Home';
import NavEnter from './NavEnter';
import Profile from './Profile';
import Signup from './Signup';
import AdminLogin from './Login/AdminLogin';
import AdminHome from './AdminContent/AdminHome';
import ManageCourses from './AdminContent/ManageCourses';
import ManageUsers from './AdminContent/Manageuser';
import Leaderboard from './Leaderboard';
import UserLogin from './Login/User-Login';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './Login/AuthContext';
import Tournment from './Tournment';
import Camp from './Camp';
import ManageMentor from './AdminContent/Managementor';

const Routing = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<NavEnter />} />
        {/* <Route path="/*" element={<Loding/>}  /> */}
        <Route path="/Signup" element={<Signup />} />
        <Route path="/NavEnter" 
        element={<ProtectedRoute element={<NavEnter />} roleRequired="user" />}/>
        <Route path="/AdminLogin" 
        element={<AdminLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Home" element={<ProtectedRoute element={<Home/>} roleRequired="user" />} />
        <Route path="/Contact" element={<ProtectedRoute element={<Contact />} roleRequired="user" />} />
        <Route path="/About" element={<ProtectedRoute element={<About />} roleRequired="user" />} />
        <Route path="/Courses" element={<ProtectedRoute element={<Courses />} roleRequired="user" />} />
        <Route path="/Profile" element={<ProtectedRoute element={<Profile />} roleRequired="user" /> } />
        <Route path="/ChessRoute" element={<ProtectedRoute element={<ChessRouting />} roleRequired="user" />} />
        <Route path="/Leaderboard" element={<ProtectedRoute element={<Leaderboard />} roleRequired="user" />} />
        <Route path="/Tournment" element={<ProtectedRoute element={<Tournment />} roleRequired="user" />} />
        <Route path="/Camp" element={<ProtectedRoute element={<Camp />} roleRequired="user" />} />
        <Route
          path="/AdminHome"
          element={<ProtectedRoute element={<AdminHome />} roleRequired="admin" />}
        />
        <Route
          path="/ManageCourses"
          element={<ProtectedRoute element={<ManageCourses />} roleRequired="admin" />}
        />
        <Route
          path="/ManageUsers"
          element={<ProtectedRoute element={<ManageUsers />} roleRequired="admin" />}
        />
        <Route
          path="/ManageMentor"
          element={<ProtectedRoute element={<ManageMentor />} roleRequired="admin" />}
        />
      </Routes>
    </AuthProvider>
  );
};

export default Routing;
