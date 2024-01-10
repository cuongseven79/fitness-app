import React from "react";
import Image from "../images/values.jpg";
import SectionHead from "./SectionHead";
import { GiCutDiamond } from "react-icons/gi";
import { programs } from "../data";
import Card from "./Card";
import Carousel from "./CarouselCustom";


const Programs = () => {
	return (
		<section className="programs">
			<div className="container programs__container">
				<div className="programs__left ">
					<div className="">
						<Carousel  />
					</div>
				</div>
				<div className="programs__right">
					<SectionHead icon={<GiCutDiamond />} title="Programs" />
					<p>
						With professional support and a team of experienced coaches, we are committed to providing customers with a unique and effective workout experience. From building muscle, to increasing strength, to improving mental clarity and flexibility, we give people the opportunity to achieve their best health and lifestyle!
					</p>
					<div className="programs__wrapper">
						{programs.map(({ id, icon, title, desc }) => (
							<Card key={id}>
								<span>{icon}</span>
								<h4>{title}</h4>
								<small>{desc}</small>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Programs;