import React from 'react'
import { SignUpForm } from '../components/SignUpForm'
import { Link } from 'react-router-dom'

export const SignUp = ({ isAdmin }) => {

	return (
		<div className="d-flex justify-content-center">
			<div className="w-50 p-3">

				<h2 className="p-3">Sign up{isAdmin ? " - Admin" : ""}</h2>
				<SignUpForm isAdmin={isAdmin} />

				<div className="p-3">
					<Link to="/login" href="#">Login</Link><br />
					<Link to={isAdmin ? "/signup" : "/signup-admin"} href="#">
						{isAdmin ? "Signup (not as admin)" : "Signup (as admin)"}
					</Link>
				</div>
			</div>
		</div>

	)
}
