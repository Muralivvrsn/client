import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { errorActions }  from '../store/Error';
import { loadingActions } from "../store/Loading";
import Swrong from './extraCredentails/Swrong'
import {motion} from 'framer-motion'
import {
  validEmail,
  validName,
  validPassword,
  validConfirmPassword,
} from "../components/extraCredentails/validation";
import picture from "../images/signup.jpg";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [text, setText] = useState("Something Went Wrong!!");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    dispatch(loadingActions.startLoading());
    e.preventDefault();

    setErrors((prev) => ({ ...prev, password: validPassword(password),email: validEmail(email), name: validName(name),confirmPassword: validConfirmPassword(password, cPassword) }));
    if (Object.values(errors).every((x) => x === null || x === "")) {
      const res = await axios
        .post("https://job-portal-poo4.onrender.com/api/register", {
          name,
          email,
          password,
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          dispatch(errorActions.hasError())
          setText(err.response.data);
        });

      console.log(res);
      if (res && res.status === 200) {
        navigate("/email-verify",{state:{email:email}});
      }
    } else {
      setText("Please provide correct information");
      console.log("Erros are there");
    }
    dispatch(loadingActions.stopLoading());
  };
  return (

      <motion.div
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: "0" }}
        transition={{ duration: 1.2 }}
        exit={{ opacity: 0, x: "-100vw" }}
      >
      <Swrong text={text} />
      <div>
        <div className="signup-form shadow bg-body rounded">
          <div className="section1">
            <img src={picture} alt="" />
          </div>
          <div className="section2 container  align-items-center justify-content-center">
            <h3 className="text-center">Creat Account</h3>
            <div className="px-3 py-1 my-3 mx-3 bg-white rounded">
              <div className="form-group">
                <label htmlFor="fname">Name</label>
                <input
                  type="text"
                  className={` border border-${
                    errors.name !== "" ? "danger" : "dark"
                  }`}
                  id="fname"
                  name="fname"
                  placeholder="Full Name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: validName(e.target.value) });
                  }}
                  required
                />
                <small className="text-danger">{errors.name}</small>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={` border border-${
                    errors.email !== "" ? "danger" : "dark"
                  }`}
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: validEmail(e.target.value) });
                  }}
                  required
                />
                <small className="text-danger">{errors.email}</small>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  className={` border border-${
                    errors.password !== "" ? "danger" : "dark"
                  }`}
                  id="pwd"
                  name="pwd"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({
                      ...errors,
                      password: validPassword(e.target.value),
                    });
                  }}
                  required
                  placeholder="Enter password"
                />
                <small className="text-danger">{errors.password}</small>
              </div>
              <div className="form-group">
                <label htmlFor="pwd2">Confirm Password</label>
                <input
                  type="password"
                  className={` border border-${
                    errors.confirmPassword !== "" ? "danger" : "dark"
                  }`}
                  id="pwd2"
                  name="pwd2"
                  onChange={(e) => {
                    setCPassword(e.target.value);
                    setErrors({
                      ...errors,
                      confirmPassword: validConfirmPassword(
                        password,
                        e.target.value
                      ),
                    });
                  }}
                  required
                  placeholder="re-enter password"
                />
                <small className="text-danger">{errors.confirmPassword}</small>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 py-1 button"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <div className="form-group pt-1 mt-2 ">
              <p className="text-center">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default Register;
