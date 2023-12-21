import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../images/logo.png";
import { links } from "../data";
import { FaBars } from 'react-icons/fa';
import { MdOutlineClose } from "react-icons/md";
import "./navbar.css";
import DropdownCustom from "./DropdownCustom";

const items = [
	{
		id: 1,
		title: "My profile",
		path: "/profile",
	},
	{
		id: 2,
		title: "Manage Customers",
		path: "/manage-customers",
	},
];

const Navbar = () => {
	const [isNavShowing, setIsNavShowing] = useState(false);

	function handleNavToggle() {
		return setIsNavShowing((prevVAlue) => {
			return !prevVAlue;
		});
	};
	function handleSelectedItem(item) {

		console.log(item)
	}
	return (
		<nav>
			<div className="container nav__container">
				<Link to="/" className="logo" onClick={handleNavToggle}>
					<img src={Logo} alt="Nav-logo" />
				</Link>
				<ul className={`nav__links ${isNavShowing ? "show__nav" : "hide__nav"}`}>
					{/* Destructure the links array of object from the links to get each item */}
					{links.map(({ name, path }, index) => {
						return (
							<li key={index}>
								<NavLink
									to={path}
									className={({ isActive }) => (isActive ? "active-nav" : "")}
									onClick={handleNavToggle}
								>
									{name}
								</NavLink>
							</li>
						);
					})}
				</ul>
				<div>
					<DropdownCustom title={"Teo Nguyen"} items={items} onSelected={handleSelectedItem} />
				</div>
				<button onClick={handleNavToggle} className="nav__toggle-btn">
					{isNavShowing ? <MdOutlineClose /> : <FaBars />}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
