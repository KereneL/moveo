const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');

async function authenticateUser({ username, password, isNewUser = false, musicalRole = "Vocalist", isAdmin = false }) {
    let user;
    if (isNewUser) {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, password: hashedPassword, musicalRole, isAdmin });
        await user.save();
    } else {
        user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Password does not match');
        }
    }

    const token = jwt.sign(
        {
            userId: user._id,
            isAdmin: user.isAdmin,
            musicalRole: user.musicalRole
        },
        process.env.JWT_SECRET || "TOKEN",
        { expiresIn: '24h' }
    );

    return { user, token };
}

module.exports = authenticateUser;