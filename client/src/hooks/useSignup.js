import { useState } from  "react";
import toast from  "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
    const apiUrl = process.env.REACT_APP_API_URL;

	const signup = async ({ username, password, musicalRole, isAdmin}) => {

		const success = handleInputErrors({ username, password });
		if (!success) return;

		setLoading(true);
		try {
			if (!musicalRole) musicalRole="Vocalist"

			const response = await fetch(`${apiUrl}/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password, musicalRole, isAdmin }),
			});

			const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("jamoveo-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ username, password }) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
