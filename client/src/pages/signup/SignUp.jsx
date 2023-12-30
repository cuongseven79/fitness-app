import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function InputField({ id, type, placeholder, value, onChange }) {
	return (
		<div className="mb-10 w-full">
			<label className="block uppercase text-gray-500" htmlFor={id}>
				{placeholder}
			</label>
			<input
				required
				type={type}
				id={id}
				className=" w-full bg-transparent border-b border-gray-500 text-black outline-none py-2 px-2 mt-2"
				placeholder={`Enter your ${placeholder.toLowerCase()}`}
				name={id}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

function SignUp() {
	const [errorMessage, setErrorMessage] = useState("");
	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		email: "",
		password: ""
	})
	const { signUp, getUser } = useAuth();

	// useEffect(() => {
	// 	document.title = `Log In | Sign Up`;
	// }, []);

	function handleFormChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const res = await signUp(formData);
		setErrorMessage(res.message);
		setFormData(
			{
				fullName: "",
				phoneNumber: "",
				email: "",
				password: ""
			}
		);
	}
	function handleGoogle(e) {
		e.preventDefault();
	}
	console.log(formData)
	return (
		<div className="mx-auto py-10 rounded-3xl bg-white mt-36 w-1/3">
			<form onSubmit={handleSubmit} className="mx-10 flex flex-col justify-center items-center">
				<InputField id="fullName" type="text" placeholder="Full Name" value={formData.fullName} onChange={handleFormChange} />
				<InputField id="phoneNumber" type="text" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleFormChange} />
				<InputField id="email" type="email" placeholder="E-Mail Address" value={formData.email} onChange={handleFormChange} />
				<InputField id="password" type="password" placeholder="Password" value={formData.password} onChange={handleFormChange} />

				<span className="text-red-500">{errorMessage}</span>
				<div className="mb-10">
					<button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full h-12 w-full text-lg font-medium">
						Sign Up
					</button>
					<div className="mt-4">
						<GoogleButton type="light" label="Login with Google" onClick={handleGoogle} />
					</div>
				</div>

				<div className="font-medium my-5 text-lg ">Already have an account?</div>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<button className="block bg-white text-blue-600 border border-gray-400 hover:text-white hover:bg-blue-200 rounded-full h-12 w-60 text-lg font-medium">Login</button>
				</Link>
			</form>
		</div>
	);
}

export default SignUp;