import React from "react";
import './Dapp.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from "./components/layout/Header";


function Dapp() {
    return (
        <div className="Dapp">
            <Header/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default Dapp;
