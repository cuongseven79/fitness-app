import React, { useEffect } from "react";
import "./home.css";
import MainHeader from "../../components/MainHeader";
import Values from "../../components/Values";
import FAQs from "../../components/FAQs";
import Testimonial from "../../components/Testimonial";
import TrainersPopular from "../../components/TrainersPopular";

const Home = () => {
	useEffect(() => {
		document.title = `HomePage`;
	}, []);
	return (
		<>
			<MainHeader />
			<TrainersPopular />
			<Values />
			<FAQs />
			<Testimonial />
			{/* <Footer /> */}
		</>
	);
};

export default Home;
