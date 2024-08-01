import React from 'react'
import { Card } from 'react-bootstrap'

export const Help = () => {
	return (
		<div className="d-flex justify-content-center">
			<Card style={{ width: "20rem" }} border="info">
				<Card.Header>
					<Card.Title className="mb-0">
						Help
					</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						This help page can be accessed without authentication :)
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}
