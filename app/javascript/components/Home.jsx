import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="vw-100 vh-100 homepage d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4 navbar-title">Kaizo Climb</h1>
          <p className="lead">A simple C.R.U.D app where users create to-do "journeys" of Super Mario World romhacks. You can map out a custom journey through many difficult kaizo hacks, and track your completion of these hacks. Most features require you to make an account.</p>
          <hr className="my-4" />
          <Link
            to="/hacklist/1"
            className="btn btn-lg custom-button"
            role="button"
          >
            Let Me See Some Hacks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
