const authenticateUser = require('./authenticateUser');

const signup = async function (request, response) {
    const { username, password, musicalRole, isAdmin } = request.body;
    try {
        const { user, token } = await authenticateUser({
            username,
            password,
            isNewUser: true,
            musicalRole,
            isAdmin
        });

        response.cookie('jwt', token);
        const userObj = {
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            musicalRole: user.musicalRole,
            token
        };

        response.status(201).json(userObj);
    } catch (error) {
        if (error.message === 'User already exists') {
            response.status(409).json({ error: "User already exists" });
        } else {
            response.status(500).json({
                message: "Error signing up user",
                error: error.message
            });
        }
    }
};

module.exports = { signup };