import React, { useEffect } from "react";
import "./home.css";
import MainHeader from "../../components/MainHeader";
import Program from "../../components/Program";
import Values from "../../components/Values";
import FAQs from "../../components/FAQs";
import Testimonial from "../../components/Testimonial";

const Home = () => {
	useEffect(() => {
		document.title = `HomePage`;
	}, []);
	return (
		<>
			<MainHeader />
			<Program />
			<Values />
			<FAQs />
			<Testimonial />
			{/* <Footer /> */}
		</>
	);
};

export default Home;
