import React, { useState } from "react";
import "./Payment.css";

const Payment = ({ courseName, courseContent, courseDescription, mentorName, mentorRating, onCancel, onEnroll }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [ccv, setCcv] = useState("");

    const handleEnroll = () => {
        // Handle enrollment logic here
        if (cardNumber && cardHolder && expiryMonth && expiryYear && ccv) {
            onEnroll(); // Call onEnroll prop function if provided
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <div className="payment-container">
            <h2>Enroll in "{courseName}"</h2>
            <p><strong>Course Content:</strong> {courseContent}</p>
            <p><strong>Course Description:</strong> {courseDescription}</p>
            <p><strong>Mentor Name:</strong> {mentorName}</p>
            <p><strong>Mentor Rating:</strong> {mentorRating}</p>

            <form className="payment-form">
                <div className="form-group">
                    <label>Bank Name</label>
                    <input type="text" placeholder="Bank Name" required />
                </div>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Card Holder</label>
                    <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Card Holder"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiry</label>
                    <div className="input-group">
                        <select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} required>
                            <option value="" disabled>
                                Month
                            </option>
                            {/* Add more months here */}
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} required>
                            <option value="" disabled>
                                Year
                            </option>
                            {/* Add more years here */}
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>CCV</label>
                    <input
                        type="text"
                        value={ccv}
                        onChange={(e) => setCcv(e.target.value)}
                        placeholder="CCV"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="enroll-button" onClick={handleEnroll}>
                        Enroll
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
