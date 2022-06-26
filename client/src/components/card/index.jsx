import React, { useState } from 'react'
import "./style.css"

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendText", {
      senderName: user,
      receiverName: post.username,
      text:"hello this is chat message",
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src="/assets/images/heartFilled.svg" alt="" className="cardIcon" />
        ) : (
          <img
            src="/assets/images/heart.svg"
            alt=""
            className="cardIcon"
          onClick={() => handleNotification(1)}
          />
        )}
        <img
          src="/assets/images/comment.svg"
          alt=""
          className="cardIcon"
        onClick={() => handleNotification(2)}
        />
        <img
          src="/assets/images/share.svg"
          alt=""
          className="cardIcon"
        onClick={() => handleNotification(3)}
        />
        <img src="/assets/images/info.svg" alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  )
}

export default Card