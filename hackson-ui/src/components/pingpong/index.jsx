import React from "react";
import './style.css'

const Pingpong = () => {
  return (
    <div className="pingpong">
      <div className="c1">
        <div className="b1"></div>
      </div>
      <div className="c2">
        <div className="b2"></div>
      </div>
      <div className="c3">
        <div className="b3"></div>
      </div>
      <div className="c4">
        <div className="b4"></div>
      </div>
      <span className="ping">PING</span>
      <span className="pong">PONG</span>
    </div>
  )
};

export default Pingpong;