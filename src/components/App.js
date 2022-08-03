import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";

import styled from "styled-components";

import "../css/reset.css";
import "../css/style.css";


export default function App(){

    const [activateHeader, setActivateHeader] = useState(false);

    return(
        <BrowserRouter>
            {true? <Header/> : <></>}     
            <Routes>
                <Route path="/" element={<SignIn setActivateHeader={useState}/>}></Route>
                <Route path="/signUp" element={<SignUp/>}></Route>
                <Route path="/habits" element={<Habits/>}></Route>
                <Route path="/today" element={<Today/>}></Route>
                <Route path="/history" element={<History/>}></Route>
            </Routes>
            {true? <Footer/> : <></>}   
        </BrowserRouter>
    );
}