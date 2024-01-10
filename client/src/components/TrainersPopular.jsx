import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import SectionHead from "./SectionHead";
import Card from "./Card";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import PT1 from '../images/trainer1.jpg';
import ModalCustom from '../components/ModalCustom';
import { getTrainersPopular } from "../api/homeService";

const TrainerModal = ({ open, setOpen, trainer }) => {
	const { displayName, email, price, phoneNumber, photoURL, certURL } = trainer || {};

	return (
		<ModalCustom title="Trainer Information" open={open} setOpen={setOpen} >
			<div className="py-4 flex justify-between">
				<ul className="">
					<li className="py-1 flex justify-between items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
						<label>{'Display Name: '}</label>
						<span>{displayName}</span>
					</li>
					<li className="py-1 flex justify-between items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
						<label>{'Phone Number:'}</label>
						<span>{phoneNumber}</span>
					</li>
					<li className="py-1 flex justify-between items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
						<label>{'Price: '}</label>
						<span>{price}</span>
					</li>
				</ul>
				<img src={photoURL} className='w-40 h-40 rounded-full' alt="Trainer" />

			</div>
			<h2 className="py-5 font-medium text-gray-900 dark:text-white">Certificate</h2>
			<div className="overflow-auto flex gap-5">
				{certURL?.map((cert, index) => <img key={index} src={cert} className='w-40' alt={`Certificate ${index + 1}`} />)}
			</div>
		</ModalCustom>
	)
}

const TrainersPopular = () => {
	const [open, setOpen] = useState(false)
	const [trainers, setTrainers] = useState([])
	const [trainerInfor, setTrainerInfor] = useState(null)

	function handleClickOnTrainer(trainer) {
		setOpen(true);
		setTrainerInfor(trainer)
	}

	async function fetchTrainer() {
		const { statusCode, trainers } = await getTrainersPopular();
		if (statusCode === 200) {
			setTrainers(trainers)
		}
	}
	useEffect(() => {
		fetchTrainer();
	}, [])
	console.log(trainers)
	if (!trainers) {
		return <h1>Loading...</h1>
	}
	return (
		<section className="trainers">
			<div className="container trainers">
				<SectionHead icon={<FaCrown />} title="The best coaches" />
				<div className="trainers">
					<div className="container grid grid-cols-3 gap-16">
						{trainers.map((trainer, index) => {
							return (
								<Card className="" key={index}>
									<div onClick={() => handleClickOnTrainer(trainer)} className="relative group mb-5 transition-all duration-200 hover:saturate-100 cursor-pointer">
										<img src={trainer.photoURL} className="rounded-3xl h-48 w-full md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl" alt="trainer one" />
										<div class="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
										<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
											<h1 class="text-lg">View information</h1>
										</div>
									</div>
									<h3 className="text-[20px]">{trainer.displayName}</h3>
									<p>{trainer.field}</p>
									<div className="my-3 flex justify-evenly mx-auto items-center">
										<h1>{`$ ${trainer.price}`}</h1>
										<select name="" id="" className="text-black px-1 rounded-md">
											<option value="">1 month</option>
											<option value="">2 month</option>
											<option value="">3 month</option>
										</select>
									</div>
									<div className="flex justify-center mb-5">
										{Array(Math.round(trainer.rating)).fill(<AiFillStar color="yellow" />)}
									</div>
									{/* <small className="mb-3">{info}</small> */}
									<Link to={"plans"} className="btn sm">Booking</Link>
								</Card>
							);
						})}
					</div>

				</div>
			</div>
			<TrainerModal open={open} setOpen={setOpen} trainer={trainerInfor} />
		</section>
	);
};

export default TrainersPopular;