import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import keycloakData from '../../keycloak.json';
import Message from './Message';

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
                    keycloak.loadUserProfile().then((user) =>{
                        localStorage.setItem('username', user.username);
                    })
				}
			});
	}, []);

	if (keycloak) {
		if (authenticated) return <Message />;
		else return <div className="my-12">Unable to initiate auth!</div>;
	}

	return (
		<>
			<div className="my-12">Redirecting to Login...</div>
		</>
	);
};

export default Home;
