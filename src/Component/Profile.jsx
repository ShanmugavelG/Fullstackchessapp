import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../asserts/Profile.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Login/AuthContext';
import Avatar from '@mui/material/Avatar';
import UpdateDetails from './Updatedetails'; // Import the new component

const Profile = () => {
    const [data, setData] = useState({ courses: [] });
    const [showUpdateDetails, setShowUpdateDetails] = useState(false); // State to control the overlay visibility
    const navigate = useNavigate();
    const { email } = useContext(AuthContext);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8091/api/users/getbyEmail", {
                    params: { email },
                });
                setData(response.data);
                setUserId(response.data.id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [email]);

    const handleUnenroll = async (coursesId) => {
        try {
            const response1=await axios.delete("http://localhost:8091/api/users/deleteusercourses", {
                params: { userId, coursesId }
            });
            if(response1.status === 200)
            {
            alert(`Course ${coursesId} is being deleted`);
            }
            else{
                alert("error in deleting");
            }
            const response = await axios.get("http://localhost:8091/api/users/getbyEmail", {
                params: { email },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error unenrolling from course:', error);
        }
    };

    const stringAvatar = (name = '') => {
        const displayName = typeof name === 'string' ? name : '';
        return {
            children: displayName.charAt(0).toUpperCase(),
        };
    };

    const refreshData = async () => {
        try {
            const response = await axios.get("http://localhost:8091/api/users/getbyEmail", {
                params: { email },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    };

    return (
        <div className='Profile'>
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <Avatar {...stringAvatar(data.firstname)} className="profile-avatar"
                        style={{ width: 100, height: 100, fontSize: '2rem', backgroundColor: '#f50057', color: '#fff' }} />
                    <div className="profile-info">
                        <h1>{data.firstname}</h1>
                    </div>
                    <Button variant="contained" onClick={() => navigate('/NavEnter')}>Sign Out</Button>
                </div>
                <div className="profile-details">
                    <h2 style={{ color: 'black' }}>Details</h2>
                    <p><strong>Location:</strong> Coimbatore</p>
                    <p><strong>Joined:</strong> {data.date}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phoneNumber}</p>
                    <p><strong>Address:</strong> {data.address}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowUpdateDetails(true)} // Show the overlay
                    >
                        Update Details
                    </Button>
                </div>
                <div className="profile-activity">
                    <h2 style={{ color: 'black', marginBottom: '20px' }}>Recent Activity</h2>
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>Enrolled courses:</h3>
                    <div className="enroll-course-list">
                        {data.courses && data.courses.length > 0 ? (
                            data.courses.map((course) => (
                                <div key={course.courseId} className="enroll-course-item">
                                    <div className="enroll-course-image">
                                        <img
                                            src={course.img}
                                            alt={course.title}
                                            className="enroll-course-img"
                                        />
                                    </div>
                                    <div className="enroll-course-details">
                                        <p className="enroll-course-title">{course.title}</p>
                                        <p className="enroll-course-description">{course.description}</p>
                                        <p className="enroll-course-id">Course ID: {course.courseId}</p>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className="enroll-unenroll-button"
                                            onClick={() => handleUnenroll(course.courseId)}
                                        >
                                            Unenroll
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No enrolled courses</p>
                        )}
                    </div>
                </div>
            </div>
            {showUpdateDetails && (
                <UpdateDetails 
                    userId={userId} 
                    onClose={() => setShowUpdateDetails(false)} 
                    refreshData={refreshData} 
                />
            )}
        </div>
    );
};

export default Profile;
