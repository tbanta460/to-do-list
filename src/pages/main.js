import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routess from '../config/routs'
import { Header } from '../components';
const Main = () => {
    return (
        <div className="containers">
            <Router>
                <Header />
                <div className="chd">
                <Routess />
                </div>
            </Router>
        </div>
    )
}

export default Main