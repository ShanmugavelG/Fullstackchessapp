import React from 'react'
import Navbar from './Navbar'
import UserCourse from './Couses/UserCourse'


const Courses = () => {
  return (
    <div style={{gap:'4rem'}}>
        <div><Navbar/></div>
        <br></br>
        <div>
          <UserCourse/>
          </div>        
    </div>
  )
}

export default Courses
