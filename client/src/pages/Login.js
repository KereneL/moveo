import React from 'react'
import { LoginForm } from '../components/LoginForm'
import { Link } from 'react-router-dom'

export const Login = () => {

	return (
		<div className="d-flex justify-content-center">
			<div className="w-25 p-3 ">

				<h2 className="p-3">Login</h2>
				<LoginForm />

				<div className="p-3">
					<Link to="/signup" href="#">Sign up</Link><br />
					<Link to="/signup-admin" href="#">Sign up (as admin)</Link>
				</div>
			</div>
		</div>
	)
}
