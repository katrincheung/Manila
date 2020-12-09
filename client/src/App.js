import './App.css';
import React, {useEffect, useState} from 'react';
import HandleMessage from "./HandleMessage";

export const socket = new WebSocket('ws://localhost:8080')

function App() {

    const [ messageQueue, setMessageQueue ] = useState('');

    useEffect(() => {
        socket.onopen = () =>  console.log("connected!");
        socket.onclose = () => console.log("disconnected");
        socket.onmessage = e => setMessageQueue(e.data);
    },[]);

    return (
          <div className="App">
                <HandleMessage messageQueue={messageQueue.split(' ')}/>
          </div>
    );
}



export default App;
