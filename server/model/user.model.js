const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
		minlength: 3,
		trim: true,
		unique: [true, "Username already exist"],
	}, password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 6
	}, musicalRole: {
		type: String,
		default: 'Vocalist'
	}, isAdmin: {
		type: Boolean,
		default: 'false'
	}
})

// get that User model or create a new one if there isn't one already
const User = mongoose.model.User || mongoose.model("User", userSchema);

module.exports = User