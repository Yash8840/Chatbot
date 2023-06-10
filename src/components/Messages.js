import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/wysa_logo.jpg";
import AuthContext from "../Context/AuthContext";
import ColorContext from "../Context/ColorContext";

const Messages = (props) => {
  const authCtx = useContext(AuthContext);
  const userImg = authCtx.currentUser.photoURL;
  const ref = useRef(); // to scroll to the latest message
  const colorCtx = useContext(ColorContext);


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messages]);
  return (
    <>
      <div>
        <div className="messageBot" style={{
                    background: `${colorCtx.currentColor.botBubbleColor}`,
                  }}>Hi There!👋</div>
      </div>
      <div>
        <div className="messageBot" style={{
                    background: `${colorCtx.currentColor.botBubbleColor}`,
                  }}>I'm Wysa - An AI chatbot built by therapists</div>
      </div>
      <div>
        <div className="messageBot" style={{
                    background: `${colorCtx.currentColor.botBubbleColor}`,
                  }}>I'm here to understand your concerns and connect you with the best resources available to support you</div>
      </div>
      <div className="mew">
        <div className="messageUser" style={{
                    background: `${colorCtx.currentColor.userBubbleColor}`,
                  }}>
          Hello Wysa 👋
        </div>
        <img src={userImg} alt="userImg" className="userImage" />
      </div>
      <div className="mewBot">
        <div className="messageBotImg">
          <img src={logo} alt="" />
        </div>
      </div>
      
      <div>
        <div className="messageBot" style={{
                    background: `${colorCtx.currentColor.botBubbleColor}`,
                  }}>This is me</div>
      </div>
      {props.messages.map((item) => {
        if (!item.img) {
          return (
            <div ref={ref} className="mew">
              <div className="messageUser" style={{
                    background: `${colorCtx.currentColor.userBubbleColor}`,
                  }}>{item.text}</div>
              <img src={userImg} alt="userImg" className="userImage" />
            </div>
          );
        } else {
          return (
            <>
              <div ref={ref} className="mew">
                <div className="messageUserImg">
                  <img src={item.img} alt="" />
                </div>
                <img src={userImg} alt="userImg" className="userImage" />
              </div>
              {item.text && (
                <div ref={ref} className="mew">
                  <div className="messageUser" style={{
                    background: `${colorCtx.currentColor.userBubbleColor}`,
                    
                  }}>{item.text}</div>
                  <img src={userImg} alt="userImg" className="userImage" />
                </div>
              )}
            </>
          );
        }
      })}
    </>
  );
};

export default Messages;
