import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';
import NavBar from './components/navbar';
import { posts } from "./data"
import { io } from "socket.io-client";

function App() {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState("")
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {
        user ?
          <>
            <NavBar socket={socket}/>
            {posts.map((post) => (
              <Card key={post.id} post={post} socket={socket} user={user}/>
            ))}
            <span className="username">{user}</span>
          </>
          :
          <div className="login">
            <h3>Chat App</h3>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => setUser(username)}>Login</button>
          </div>
      }
    </div>
  );
}

export default App;
