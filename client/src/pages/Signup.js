import React from 'react'
import { Card } from 'react-bootstrap'
import { SignUpForm } from '../components/SignUpForm'

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
					<Card.Link href="/login">Login</Card.Link><br />
					<Card.Link href={isAdmin ? "/signup" : "/signup-admin"}>
						{isAdmin ? "Signup (not as admin)" : "Signup (as admin)"}
					</Card.Link>
				</Card.Body>
			</Card>
		</div>
	)
}
