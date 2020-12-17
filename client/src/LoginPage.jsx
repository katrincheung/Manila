import React, { useState } from "react";
import { socket } from './App'
import './LoginPage.css';
import LoginInput from "./components/Login/LoginInput";
import Header from "./components/common/Header";
import Seat from "./components/game/GameBoard/Seat";


function LoginPage() {

    const [ name, setName ] = useState("");
    const [ code, setCode ] = useState("");

    const handleSubmit = () => {
        socket.send(`LOGIN ${name} ${code}`);
    }


    return (
        <div className="login-page">
            <Header>Login Form</Header>
            <div className="form">
                <LoginInput value={name} placeholder='NAME' onChange={e => setName(e.target.value)}/>
                <LoginInput value={code} placeholder='ROOM CODE' onChange={e => setCode(e.target.value)}/>
                <button type="button" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;
