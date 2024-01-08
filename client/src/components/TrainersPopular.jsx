import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import SectionHead from "./SectionHead";
import { programs } from "../data";
import Card from "./Card";
import { Link } from "react-router-dom";
import { AiFillCaretRight, AiFillStar } from "react-icons/ai";
import PT1 from '../images/trainer1.jpg';
import ModalCustom from '../components/ModalCustom';

const TrainerModal = ({ open, setOpen }) => {
	return (
		<ModalCustom title="Profile" open={open} setOpen={setOpen} >
			<div className="py-4 flex justify-between">
				<ul>
					<li className="py-1 flex justify-between items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
						<label>{'Display Name'}</label>
						<span >Nguyễn Văn Tèo</span>
					</li>
				</ul>
				<img src={PT1} className='w-40 h-40 rounded-full' alt="" />
			</div>
			<h2 className="py-5 font-medium text-gray-900 dark:text-white">Certificate</h2>
			<div className="overflow-auto flex gap-5">
				<img src={PT1} className='w-40' alt="" />
			</div>
		</ModalCustom>
	)
}

const TrainersPopular = () => {
	const [open, setOpen] = useState(false)

	return (
		<section className="trainers">
			<div className="container trainers ">
				<SectionHead icon={<FaCrown />} title="Trainers popular " />
				<div className="trainer__wrapper">
					{programs.map(({ id, trainer, title, info, path }) => {
						return (
							<Card className="trainers__trainer" key={id}>
								<button type="button" onClick={() => setOpen(true)} className="trainers__image transition-all duration-200 hover:saturate-100 mb-5 cursor-pointer">
									<img src={PT1} className="rounded-3xl w-full md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl" alt="trainer one" />
								</button>
								<h4 className="my-4 text-[20px]">{title}</h4>
								<div className="my-4 flex justify-evenly mx-auto items-center">
									<h1>$ 1000</h1>
									<select name="" id="" className="text-black px-1 rounded-md">
										<option value="">1 month</option>
										<option value="">2 month</option>
										<option value="">3 month</option>
									</select>
								</div>
								<div className="flex justify-center  ">
									<AiFillStar color="yellow" />
									<AiFillStar color="yellow" />
									<AiFillStar color="yellow" />
									<AiFillStar color="yellow" />
									<AiFillStar color="yellow" />

								</div>
								<small>{info}</small>
								<Link to={path} className="btn sm">
									Booking
								</Link>
							</Card>
						);
					})}
				</div>
			</div>
			<TrainerModal open={open} setOpen={setOpen} />
		</section>
	);
};

export default TrainersPopular;
