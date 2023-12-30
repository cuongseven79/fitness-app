import { createContext, useContext, useEffect, useState } from "react";
import { addUser, getUsers } from "../api/authService";

const AuthContext = createContext();
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	async function login(email, password) { }

	async function signInGoogle() { }

	async function signUp({ fullName, phoneNumber, email, password }) {
		try {
			const { statusCode } = await addUser({ fullName, phoneNumber, email, password });
			switch (statusCode) {
				case 201:
					window.location.href = "/login";
					return { message: "Register Successfully!" };
				default:
					return { message: "Unexpected status code: " + statusCode };
			}
		} catch (error) {
			if (error.response && error.response.status) {
				const statusCode = error.response.status;
				switch (statusCode) {
					case 400:
						return { message: "Your email already exists" };
					default:
						return { message: "Unexpected error status code: " + statusCode };
				}
			} else {
				return { message: "An error occurred: " + error.message };
			}
		}
	}

	async function logOut() { }

	async function resetPassword(email) {
		// return sendPasswordResetEmail(auth, email, {
		// 	url: window.location.origin + `/login`,
		// }).catch((error) => {
		// 	// Handle Errors
		// 	const errorMessage = error.message;
		// 	console.error(error);

		// 	alert(errorMessage);
		// });
	}

	// }
	async function deleteCurrentUser() { }

	async function updateUserInfo(name, email, photoURL, bio, website) { }

	async function updateUserPassword(password) { }

	async function getUser() {
		return getUsers();
	}

	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChanged(auth, (user) => {
	// 		setCurrentUser(user);
	// 		setLoading(false);
	// 	});

	// 	return unsubscribe;
	// }, []);

	const value = {
		// currentUser,
		// signInGoogle,
		// deleteCurrentUser,
		// updateUserInfo,
		// updateUserPassword,
		getUser,
		// login,
		// logOut,
		// resetPassword,
		signUp,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
