import React from 'react';
import '../asserts/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Navbar = () => {
    const navigate = useNavigate();

    const home = () => {
        navigate('/Home');
    };
    const contact = () => {
        navigate('/Contact');
    };
    const about = () => {
        navigate('/About');
    };
    const Courses = () => {
        navigate('/Courses');
    };

    return (
        <div>
            <nav className="navbar" >
                    <h1 style={{color:'white',userSelect:'none'}}>CHESS ARCHADE</h1>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Button varient="outlined" onClick={home}>Home</Button>
                    </li>
                    <li className="navbar-item">
                        <Button varient="outlined" onClick={Courses}>Courses</Button>
                    </li>
                    {/* <li className="navbar-item">
                        <Button varient="outlined" onClick={()=>navigate('/Leaderboard')}>Leadboard</Button>
                    </li> */}
                    <li className="navbar-item">
                        <Button varient="outlined" onClick={contact}>Contact</Button>
                    </li>
                    <li className="navbar-item">
                        <Button varient="outlined" onClick={about}>About</Button>
                    </li>
                    <li className="navbar-item">
                        <Button varient="outlined" onClick={()=> navigate('/ChessRoute')}>
                            <SportsEsportsIcon/>
                        </Button>
                    </li>
                    <li className="navbar-item">
                        <Button varient="outlined" onClick={()=> navigate('/Profile')}>
                            <AccountBoxIcon/>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
