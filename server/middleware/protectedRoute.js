const jwt = require('jsonwebtoken');
const User = require('../model/user.model')

const protectedRoute = async function(request, response, next) {
	try {
		// extract the jwt cookie from request
		const token = request.cookies.jwt;

		// if no token is found, return a 401
		if (!token) {
			return response.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// (and if there is a token,) verify against token
		const decoded = jwt.verify(token, "TOKEN");

		// if unsuccesful - ruturn a 401
		if (!decoded) {
			return response.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// (and if successful,) find the user in db
		const user = await User.findById(decoded.userId).select("-password");

		// if unsuccesful - ruturn a 404
		if (!user) {
			return response.status(404).json({ error: "User not found" });
		}

		// (and if successful,) add relevant user to request body
		request.user = user;

		next();
	} catch (error) {
		console.log("Error in protectedRoute middleware: ", error.message);
		response.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {protectedRoute};
