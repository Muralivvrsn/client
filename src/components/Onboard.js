import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import { motion} from "framer-motion";
const Onboard = () => {
  return (
        <motion.div
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: "0" }}
        exit={{ y: "100vw", opacity:0}}
        transition={{ duration: 1.3 , ease:"easeIn"}}
      >
        <div className="Nav">
          <header className="d-flex mx-auto">
            <nav>
              <img src={logo} alt="" />
            </nav>
            <nav>
              <Link to="/register">
                <button className="btn btn-primary">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </nav>
          </header>
        </div>
        <div className="explore">
          <h1 className="text-center mt-5 p-5 w-4 h-5">
            Choose a job you love, and you will never have to work a day in your
            life
          </h1>
          <Link to="/swrong">
            <button className="btn-warning text-center">Explore</button>
          </Link>
        </div>
      </motion.div>
  );
};

export default Onboard;
