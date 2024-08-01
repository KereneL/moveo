import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import useSignup from '../hooks/useSignup';

export const SignUpForm = function ({ isAdmin }) {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        musicalRole: "",
        isAdmin
    });

    // make sure isAdmin is updated
    useEffect(() => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            isAdmin
        }));
    }, [isAdmin]);

    const { signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <>
            <Form onSubmit={(event) => handleSubmit(event)}>
                {/* username */}
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        placeholder="Enter username"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        placeholder="Password"
                    />
                </Form.Group>

                {/* musical role */}
                <Form.Group controlId="formMusicalRole">
                    <Form.Label>Musical Role</Form.Label>
                    <Form.Control
                        type="text"
                        name="musical-role"
                        value={inputs.musicalRole}
                        onChange={(e) => setInputs({ ...inputs, musicalRole: e.target.value })}
                        placeholder="Leave empty if you are a vocalist"
                    />
                </Form.Group>

                {/* signup button */}
                <Button
                    variant="primary"
                    type="submit"
                    onSubmit={(event) => handleSubmit(event)}
                    className="m-3"
                >
                    Sign up
                </Button>
            </Form>
        </>
    );
}