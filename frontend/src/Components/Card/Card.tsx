import React from "react";
import "./Card.css";

type Props = {};

const Card = (props: Props) => {
  return (
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVhY3Rqc3xlbnwwfHwwfHx8MA%3D%3D"
        alt="image"
      />
      <div className="details">
        <h2>AAPL</h2>
        <p>110$</p>
      </div>
      <p className="info">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, nam!
      </p>
    </div>
  );
};

export default Card;
