import React, { useState } from "react";
import MyInput from './components/common/MyInput'
import { socket } from './App'
import './LoginPage.css';
import LoginInput from "./components/Login/LoginInput";
import Header from "./components/common/Header";


function LoginPage() {

    const [ name, setName ] = useState("");
    const [ code, setCode ] = useState("");

    const handleSubmit = () => {
        socket.send(`NAME_INPUT ${name} ${code}`);
    }


    return (
        <div className="login-page">
            <Header>Login Form</Header>
            <div className="form">
                <LoginInput value={name} placeholder='NAME' onClick={e => setName(e.target.value)}/>
                <LoginInput value={code} placeholder='ROOM CODE' onClick={e => setCode(e.target.value)}/>
                <button type="button" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage;
