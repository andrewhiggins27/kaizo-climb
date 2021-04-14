import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Super Mario World Kaizo Hacks</h1>
          <p className="lead">Checkout These Hacks Homie</p>
          <hr className="my-4" />
          <Link
            to="/hacklist/1"
            className="btn btn-lg custom-button"
            role="button"
          >
            View Hacks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
