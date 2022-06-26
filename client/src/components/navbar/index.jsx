import React, { useEffect, useState } from 'react'
import "./style.css"

const NavBar = ({ socket }) => {

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("getText", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, text }) => {

    return (
      <span className="notification">{`${senderName}: ${text} `}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src="/assets/images/notification.svg" className="iconImg" alt="" />
          {
            notifications.length > 0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src="/assets/images/message.svg" className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src="/assets/images/settings.svg" className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  )
}

export default NavBar