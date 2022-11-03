import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import Home from './Pages/Home';
import Message from "./Pages/Message/Message";

const App = () => {
    const keycloak = new Keycloak('/keycloak.json');

    const initOptions = {
        onLoad: 'login-required',
    };

    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/message" element={<Message/>}/>
                </Routes>
            </Router>
        </ReactKeycloakProvider>
    );
};

export default App;
