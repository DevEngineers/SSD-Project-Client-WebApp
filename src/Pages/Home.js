import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import keycloakData from '../../keycloak.json';
import messageService from '../Services/MessageService';

const Home = () => {
	const [keycloak, setKeycloak] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const keycloak = new Keycloak(keycloakData);
		keycloak.init({
				onLoad: 'login-required',
				checkLoginIframe: false,
			})
			.then(authenticated => {
				setKeycloak(keycloak);
				setAuthenticated(authenticated);

				if (authenticated) {
					localStorage.setItem('token', keycloak.token);
				}
	
			});
	}, []);

	const onClickButton = async () =>{
		const res = await messageService.getMessages();
		console.log(res);
	}

	if (keycloak) {
		if (authenticated)
			return (
				<div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
					<p> You are logged in.</p>
					<br/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickButton}>
						Get Messages
					</button>
				</div>
			);
		else return <div className="my-12">Unable to initiate auth!</div>;
	}

	return (
		<>
			<div className="p-2">Redirecting to Login...</div>
		</>
	);
};

export default Home;
