import React, { useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import { ImQuotesLeft } from "react-icons/im";
import avatar from "../images/avatar1.jpg";
import Card from "./Card";
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from "react-icons/io";
import { getDataDashboard } from "../api/homeService";

const TestimonialCard = ({ feedback }) => (
	<Card className="testimonial">
		<div className="testimonial__avatar">
			<img src={avatar} alt={'avatar'} />
		</div>
		<p className="testimonial__quote">{`"${feedback.message}"`}</p>
		<h5>{feedback.displayName}</h5>
		<small className="testimonial__title">{feedback.title}</small>
	</Card>
);

const Testimonial = () => {
	const [index, setIndex] = useState(0);
	const [testimonials, setTestimonials] = useState([]);

	const handlePreviousBtn = () => {
		setIndex((prevIndex) => {
			return prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1;
		});
	};
	const handleNextBtn = () => {
		setIndex((prevIndex) => {
			return prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1;
		});
	};

	const fetchTestimonial = async () => {
		try {
			const { feedbacks } = await getDataDashboard('/feedback')
			setTestimonials(feedbacks)
		} catch (error) {
			alert('Failed to fetch testimonials');
			console.error('Failed to fetch testimonials:', error);
		}
	}
	useEffect(() => {
		fetchTestimonial();
	}, [])
	return (
		<section className="testimonials">
			<div className="container ">
				<SectionHead icon={<ImQuotesLeft />} title="Testimonials" className="testimonials__head" />
				{testimonials[index] && <TestimonialCard feedback={testimonials[index]} />}
				<div className="testimonial__btn-container">
					<button className="testimonials__btn" onClick={handlePreviousBtn}><IoIosArrowDropleftCircle className="circle-icon" /></button>
					<button className="testimonials__btn" onClick={handleNextBtn}><IoIosArrowDroprightCircle className="circle-icon" /></button>
				</div>
			</div>
		</section>
	);
};

export default Testimonial;