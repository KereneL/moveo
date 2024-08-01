import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuthContext();
      const navigate = useNavigate();
  
      const handleLogout = () => {
        // Call logout to clear auth state
        logout(); 
        // Navigate to home page
        navigate('/'); 
      };

    return (
        <Button
        type="button"
        onClick={handleLogout}
        variant="outline-dark"
        size="sm"
        className="ms-1"
      >
        Log out
      </Button>
    );
};

export default LogoutButton;
