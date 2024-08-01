import React from 'react'
import { Card } from 'react-bootstrap'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {

	return (
		<div className="d-flex justify-content-center">
			<Card style={{ width: "20rem" }} border="primary">
				<Card.Header>
					<Card.Title className="mb-0">
						Login
					</Card.Title>
				</Card.Header>
				<Card.Body>

					<LoginForm />
					<Card.Link to="/signup" href="#">Sign up</Card.Link><br />
					<Card.Link to="/signup-admin" href="#">Sign up (as admin)</Card.Link>
				</Card.Body>
			</Card>
		</div>
	)
}
