// controllers/login.js
const authenticateUser = require('./authenticateUser');


const login = async function (request, response) {
    const { username, password } = request.body;
    try {
        const { user, token } = await authenticateUser({ username, password });
        response.cookie('jwt', token, { httpOnly: true, secure: true }); // Set secure: true in production
        response.status(200).json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            musicalRole: user.musicalRole,
            token
        });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Password does not match') {
            response.status(401).json({ error: error.message });
        } else {
            response.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
};

module.exports = { login };