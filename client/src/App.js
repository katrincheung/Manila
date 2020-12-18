import './App.css';
import React, { useState　} from 'react';
import HandleMessage from "./HandleMessage";


export const socket = new WebSocket('ws://localhost:8080')

function App() {

    const [ message, setMessage] = useState('');

    socket.onopen = () =>  console.log("connected!");
    socket.onclose = () => console.log("disconnected");
    socket.onmessage = e => setMessage(e.data);

    return (
        <div className="App">
        <HandleMessage message={message.split(' ')}/>
        </div>
    );
}



export default App;
