import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";

import UserContexts from "../contexts/UserContexts";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import Footer from "./Footer";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";

import "../css/reset.css";
import "../css/style.css";


export default function App(){

    const [signedIn, setSignIn] = useState(false);
    const [token, setToken] = useState("");

    const value = {token, setToken, setSignIn};

    return(
        <UserContexts.Provider value={value}>
            <BrowserRouter>
                {signedIn? <Header/> : <></>}     
                <Routes>
                    <Route path="/" element={<SignIn/>}></Route>
                    <Route path="/signUp" element={<SignUp/>}></Route>
                    <Route path="/habits" element={<Habits/>}></Route>
                    <Route path="/today" element={<Today/>}></Route>
                    <Route path="/history" element={<History/>}></Route>
                </Routes>
                {signedIn? <Footer/> : <></>}   
            </BrowserRouter>
        </UserContexts.Provider>
    );
}