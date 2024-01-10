import React, { useEffect } from "react";
import "./home.css";
import MainHeader from "../../components/MainHeader";
import Programs from "../../components/Programs";
import FAQs from "../../components/FAQs";
import Testimonial from "../../components/Testimonial";
import TrainersPopular from "../../components/TrainersPopular";
import StatsComponent from "../../components/StatsComponent";

const Home = () => {
	useEffect(() => {
		document.title = `HomePage`;
	}, []);
	return (
		<>
			<MainHeader />
			<StatsComponent/>
			<TrainersPopular />
			<Programs />
			<FAQs />
			<Testimonial />
			{/* <Footer /> */}
		</>
	);
};

export default Home;
