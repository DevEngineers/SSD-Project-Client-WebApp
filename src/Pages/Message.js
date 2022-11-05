import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import headerlogo from '/src/Assets/Images/icons8-wechat-48.png';
import MessageService from '../Services/MessageService';

const options = {
	position: toast.POSITION.TOP_RIGHT,
	hideProgressBar: true,
	autoClose: 3000,
	closeButton: false,
};

const Message = () => {
	const [message, setMessage] = useState('');
	const [date, setDate] = useState('');
	const [file, setFile] = useState('');
	const [post, setPost] = React.useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const data = await MessageService.getMessageByID(localStorage.getItem('username'));
		setPost(data);
	};
	const handleSubmit = async event => {
		event.preventDefault();
		let Message = {
			message: message,
			date: date,
			file: file,
		};

		const response = await MessageService.storeMessage(Message);
		console.log('response : ', response);
		if (response.status === 200) {
			toast.success(' Message  Sent Successfully');
		} else {
			toast.error(Error('Something went wrong!! Try again.'));
		}
	};

	const handleMessage = e => {
		e.preventDefault();
		setMessage(e.target.value);
	};
	const handleDate = e => {
		e.preventDefault();
		setDate(e.target.value);
	};
	const handleFile = e => {
		console.log(e.target.files);
		setFile(e.target.files[0]);
	};

	return (
		<div className={'h-full bg-gray-900'}>
			<ToastContainer />
			<div
				className={
					'grid grid-cols-2  place-content-center relative px-20 gap-2'
				}>
				<div className={'col-span-1 '}>
					<h1
						className={
							'py-5 text-3xl font-bold text-white text-right '
						}>
						Fortis
					</h1>
				</div>
				<div className={'col-span-1 pt-5'}>
					<img className={''} src={headerlogo} alt="headerLogo" />
				</div>
			</div>
			<div className={'grid grid-cols-5 pt-5'}>
				{/*Container 1*/}
				<div className={'col-span-2 px-2'}>
					<div
						className={
							'bg-white shadow-md rounded px-8 pb-2 mb-4 '
						}>
						<div className={'mb-6 pt-5'}>
							<label
								className={
									'block text-gray-700 text-sm font-bold mb-2'
								}>
								Message
							</label>
							<input
								type="text"
								onChange={handleMessage}
								placeholder={'Write Your Message here...'}
								className={
									'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								}
							/>
						</div>
						<div className={'mb-6'}>
							<label
								className={
									'block text-gray-700 text-sm font-bold mb-2'
								}>
								{' '}
								File Upload
							</label>
							<input
								type="file"
								onChange={handleFile}
								className={
									'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								}
							/>
						</div>
						<div className={'mb-6'}>
							<label
								className={
									'block text-gray-700 text-sm font-bold mb-2'
								}>
								Date
							</label>
							<input
								type="date"
								onChange={handleDate}
								placeholder={'Write Your Message here...'}
								className={
									'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								}
							/>
						</div>
						<div className={'pt-6'}>
							<button
								onClick={handleSubmit}
								className={
									'bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								}>
								SEND
							</button>
						</div>
					</div>
				</div>
				{/*Container 2*/}
				<div className={'col-span-3 px-2 overflow-auto  h-screen'}>
					<div className={'bg-white shadow-md rounded '}>
						<div className="relative pt-2 px-2">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
									<tr>
										<th scope="col" className="py-3 px-6">
											Message
										</th>
										<th scope="col" className="py-3 px-6">
											Date
										</th>
										<th scope="col" className="py-3 px-6">
											File
										</th>
									</tr>
								</thead>
								<tbody>
									{post.map(post => (
										<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-600">
											<td className="py-4 px-6">
												{post.message}
											</td>
											<td className="py-4 px-6">
												{post.date}
											</td>
											{/*<td className="py-4 px-6">*/}
											{/*    {post.file}*/}
											{/*</td>*/}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Message;
