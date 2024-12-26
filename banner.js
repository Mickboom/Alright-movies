import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="overlay">
        <div className="container text-center text-white">
          <h1 className="display-4">Discover Movies You'll Love</h1>
          <p>Stream or download anytime, anywhere.</p>
          <button className="btn btn-danger btn-lg">Start Watching</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
