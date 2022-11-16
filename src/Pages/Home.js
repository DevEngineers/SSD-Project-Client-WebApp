import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import headerLogo from '/src/Assets/Images/icons8-wechat-48.png';
import MessageService from '../Services/MessageService';
import Keycloak from 'keycloak-js';
import keycloakData from '../../keycloak.json';

const options = {
	position: toast.POSITION.TOP_RIGHT,
	hideProgressBar: true,
	autoClose: 3000,
	closeButton: false,
};

const Home = () => {
	const [message, setMessage] = useState('');
	const [date, setDate] = useState('');
	const [file, setFile] = useState('');
	const [post, setPost] = useState([]);
	const [keycloak, setKeycloak] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [role, setRole] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const keycloak = new Keycloak(keycloakData);
		keycloak
			.init({
				onLoad: 'login-required',
				checkLoginIframe: false,
			})
			.then(authenticated => {
				setKeycloak(keycloak);
				setAuthenticated(authenticated);
				if (authenticated) {
					localStorage.setItem('token', keycloak.token);
					keycloak.loadUserProfile().then(user => {
						localStorage.setItem('username', user.username);
						if(keycloak.realmAccess.roles.includes('app-manager')){
							setRole('manager');
						}else if(keycloak.realmAccess.roles.includes('app-worker')){
							setRole('worker');
						}
					});
				}
			});
	}, []);

	const fetchData = async () => {
		const data = await MessageService.getMessageByID(localStorage.getItem('username'));
		if (data.length > 0) {
			setPost(data);
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();
		let Message = {
			user: localStorage.getItem('username'),
			message: message,
			date: date,
			fileLocation: '',
		};

		if (message === '') {
			toast.warning('Enter a message!.');
		} else if (date === '') {
			toast.warning('Select a date!.');
		} else {
			if (role === 'worker') {
				const res = await MessageService.storeMessageWorker(Message);
				if (res.status === 200) {
					fetchData();
					toast.success(' Message Sent Successfully');
				} else {
					toast.error(Error('Something went wrong!! Try again.'));
				}
			} else if (role === 'manager') {
				if (file !== '') {
					const response = await MessageService.FileUploads(file);
					Message.fileLocation = response.body;
				}

				const res = await MessageService.storeMessageManager(Message);
				if (res.status === 200) {
					fetchData();
					toast.success(' Message Sent Successfully');
				} else {
					toast.error(Error('Something went wrong!! Try again.'));
				}
			} else {
				toast.error(Error('Something went wrong!! Try again.'));
			}
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

	const handleLogout = e => {
		e.preventDefault();
		localStorage.clear();
		keycloak.logout();
	};

	if (keycloak) {
		if (authenticated) {
			return (
				<div className={'h-full bg-gray-900'}>
					<ToastContainer />
					<div className="flex items-center justify-center">
						<div className="flex-1"></div>
						<div className="w-32 h-15 pt-1">
							<h1
								className={
									'py-5 text-3xl font-bold text-white text-right '
								}>
								Fortis
							</h1>
						</div>
						<div className="w-32 h-15 pt-4">
							<img
								className={''}
								src={headerLogo}
								alt="headerLogo"
							/>
						</div>
						<div className="flex-1">
							<div className="w-20 h-20 mr-2 pt-7 ml-auto">
								<button
									onClick={handleLogout}
									className={
										'bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
									}>
									Logout
								</button>
							</div>
						</div>
					</div>
					<div className={'grid grid-cols-5 pt-5'}>
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
										placeholder={
											'Write Your Message here...'
										}
										className={
											'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										}
									/>
								</div>
								{role === 'manager' ? (
									<div className={'mb-6'}>
										<label
											className={
												'block text-gray-700 text-sm font-bold mb-2'
											}>
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
								) : (
									<></>
								)}
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
										placeholder={
											'Write Your Message here...'
										}
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
						<div
							className={
								'col-span-3 px-2 overflow-auto  h-screen'
							}>
							<div className={'bg-white shadow-md rounded '}>
								<div className="relative pt-2 px-2">
									<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
											<tr>
												<th
													scope="col"
													className="py-3 px-6">
													Message
												</th>
												<th
													scope="col"
													className="py-3 px-6">
													Date
												</th>
											</tr>
										</thead>
										{
											post.length > 0 ? 
											<tbody>
												{
													post.map((value, key) => {
														return(
															<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-600">
																<td className="py-4 px-6">
																	{value.message}
																</td>
																<td className="py-4 px-6">
																	{value.date}
																</td>
															</tr>
														)
													})
												}
											</tbody>
											: <tbody>
												<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-600">
													<td className="py-4 px-6">
														No Messages
													</td>
												</tr>
											</tbody>
										}
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <div className="my-12 p-5">Unable to initiate auth!</div>;
		}
	}
	return <div className="my-12 p-5">Redirecting...</div>;
};

export default Home;