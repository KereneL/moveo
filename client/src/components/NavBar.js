import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function NavBar({ isLoggedIn }) {

    const navigate = useNavigate();
    const { logout } = useAuthContext();

    const handleLogout = () => {
        // Call logout to clear auth state
        logout(); 
        // Navigate to home page
        navigate('/'); 
    };

    return (
        <div className="d-flex justify-content-center">
            <Nav id="navigation" className="mb-4">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/help">Help</Nav.Link>
                {isLoggedIn ? "" : <Nav.Link href={"/login"} className="mx-1">Login</Nav.Link>}
                {isLoggedIn ? "" : <Nav.Link href={"/signup"} className="mx-1">Sign up</Nav.Link>}
                {isLoggedIn ? "" : <Nav.Link href={"/signup-admin"} className="mx-1">Sign up (Admin)</Nav.Link>}
                {isLoggedIn ? <Nav.Link onClick={handleLogout} className="mx-1">Logout</Nav.Link> : ""}
            </Nav>
        </div>
    );
}

