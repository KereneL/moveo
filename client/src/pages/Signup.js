import React from 'react'
import { Card } from 'react-bootstrap'
import { SignUpForm } from '../components/SignUpForm'
import { Link } from 'react-router-dom'

export const SignUp = ({ isAdmin }) => {

	return (
		<div className="d-flex justify-content-center">
			<Card style={{ width: "20rem" }} border="primary">
				<Card.Header>
					<Card.Title className="mb-0">
						Sign up{isAdmin ? " - Admin" : ""}
					</Card.Title>
				</Card.Header>
				<Card.Body>
					<SignUpForm isAdmin={isAdmin} />
					<Card.Link to="/signup" href="#">Sign up</Card.Link><br />
					<Link to={isAdmin ? "/signup" : "/signup-admin"} href="#">
						{isAdmin ? "Signup (not as admin)" : "Signup (as admin)"}
					</Link>
				</Card.Body>
			</Card>
		</div>
	)
}
