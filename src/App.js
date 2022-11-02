import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import FileUpload from "./Components/FileUpload";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/fileUpload" element={<FileUpload/>}/>
            </Routes>
        </Router>
    );
};

export default App;
