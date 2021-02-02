import React from "react";
import './Dapp.css';
import Home from './components/Dashboard';
import Footer from './components/layout/Footer';
import Header from "./components/layout/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Landing from "./components/home/Landing";
import DashHeader from "./components/layout/DashHeader";


function Dapp() {
    return (
        <Router>
            <div className="Dapp">
                <Switch>
                    <Route path="/dashboard">
                        <DashHeader/>
                    </Route>
                    <Route path="/">
                        <Header/>
                    </Route>
                </Switch>

                <Switch>
                    <Route path="/dashboard">
                        <Home/>
                    </Route>
                    <Route path="/">
                        <Landing/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default Dapp;
