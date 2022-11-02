import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import keycloakData from '../../keycloak.json';

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

	if (keycloak) {
		if (authenticated)
			return (
				<div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
					<p> You are logged in.</p>
				</div>
			);
		else return <div className="my-12">Unable to initiate auth!</div>;
	}

	return (
		<>
			<div className="my-12">Keycloak initializing in a moment...</div>
		</>
	);
};

export default Home;
