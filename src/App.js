import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import Home from './Pages/Home';
import CreateMessage from "./Pages/Message/CreateMessage";
import ViewMessage from "./Pages/Message/ViewMessage";

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
                    <Route path="/message" element={<CreateMessage/>}/>
                    <Route path="/messages" element={<ViewMessage/>}/>
                </Routes>
            </Router>
        </ReactKeycloakProvider>
    );
};

export default App;
