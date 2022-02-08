import React from "react";
import "./NotFoundPage.scss";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>The Page you're looking for is Not Here</h1>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
