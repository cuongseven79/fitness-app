import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPaymentResult } from '../../api/ordersService';
import './payment.css';

export const Payment = () => {
	const [showDialog, setShowDialog] = useState(true);
	const [modalTitle, setModalTitle] = useState('');
	const [modalBody, setModalBody] = useState('');
	const [queryResult, setQueryResult] = useState('');

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		getQueryResult();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (queryResult) {
			fetchReultPayment();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryResult]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchReultPayment = async () => {
		const res = await getPaymentResult(queryResult);
		if (res.RspCode === '00') {
			setModalTitle('Success');
			setModalBody('Payment success!');
		} else {
			setModalTitle('Error');
			setModalBody('Payment failed!');
		}
		setShowDialog(true);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getQueryResult = () => {
		const vpnReturn = 'http://localhost:3000/payment/callback';
		const currentUrl = window.location.href;
		const query = currentUrl.replace(vpnReturn, '');
		setQueryResult(query);
	};

	return showDialog ? (
		<section>
			<div className="container notify__container py-6">
				<div className="text-center">
					<h2> {modalTitle} </h2>
					<span>{modalBody}</span>
				</div>
				<Link to="/" className="btn">
					Go back Home
				</Link>
			</div>
		</section>
	) : (
		<section>
			<div className="text-center py-6">
				<h2> Loading.... </h2>
			</div>
		</section>
	);
};

export default Payment;
