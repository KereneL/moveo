import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuthContext();

    return (

        <Button
        variant="primary"
        type="submit"
        onClick={logout}
        className="m-3"
      >
        Log out
      </Button>
    );
};

export default LogoutButton;
