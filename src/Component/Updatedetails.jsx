import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import '../asserts/Updatedetails.css';

const UpdateDetails = ({ userId, onClose, refreshData }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleUpdateDetails = async () => {
        try {
            const userDetails = { address, phoneNumber };
            await axios.patch("http://localhost:8091/api/users/updateuserdetails", userDetails, {
                params: { userId },
                headers: { 'Content-Type': 'application/json' },
            });
            alert('Details updated successfully!');
            setPhoneNumber('');
            setAddress('');
            refreshData(); // Refresh data on the Profile page after updating
            onClose(); // Close the overlay
        } catch (error) {
            console.error('Error updating details:', error);
        }
    };

    return (
        <div className="update-details-overlay">
            <div className="update-details-content">
                <h3>Update Details</h3>
                <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateDetails}
                >
                    Update Details
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default UpdateDetails;
