import axios from "axios";

const API_URL1 = "http://localhost:8091/courses"; 
const API_URL2 = "http://localhost:8091/api/users"; 
const API_URL3 = "http://localhost:8091/mentor"; 

export const getalldata = () => axios.get(`${API_URL2}/getusers`);

export const handleDeleteUser = (id) => axios.delete(`${API_URL2}/deleteuser`,{ params: { id } });
export const postalldata = async (data) => {
    try {  
        await axios.post(`${API_URL2}/register`, data);
        alert("Sign in success");
    } catch (err) {
        console.log(err);
    }
}
export const getCourses = () => axios.get(`${API_URL1}/getCoursesdata`);

export const addCourse = async (data) => {
    try {
        await axios.post(`${API_URL1}/insertCourses`, [data]);
        alert("Course added successfully");
    } catch (err) {
        console.error('Error adding course:', err);
        alert("Failed to add course");
    }
};

export const deleteCoursesdetail = async (id) => {
    try {
        
        await axios.delete(`${API_URL1}/deletecourses`, {
            params: { id },
        });
        
        alert("Course deleted");
    } catch (error) {
    }
};
export const deletementordetail = async (mentorID) => {
    try {
        await axios.delete(`${API_URL3}/deletementor`, {
            params: { mentorID },
        });
            alert("Mentor deleted successfully.");
    } catch (error) {
        // Handle error
        console.error("Error deleting mentor:", error);
        alert("An error occurred while deleting the mentor.Mentor may assigned to courses,so change mentor of the courses accordingly ");
    }
};
export const addMentor = async (data) => {
    try {
        await axios.post(`${API_URL3}/postmentor`, data);
        alert("Mentor added successfully");
    } catch (err) {
        alert("Failed to add Mentor");
        console.error('Error adding course:', err);
    }
};
export const addcoursementor = async (Courses_id, Mentor_id) => {
    try {
        const response=await axios.patch(`${API_URL1}/addmentor`, null, {
            params: {
                Courses_id,
                Mentor_id
            }
        });
         return response;
    } catch (error) {
        console.error('Error adding mentor to course:', error);
        alert("check weather the course and mentor exists");
    }
};


