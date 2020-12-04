import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import {useAuth} from '../../contexts/authContext';

import "./signup.style.css";

export default function SignUp() {
  const history = useHistory();
    const [formValues, setFormValues] = useState({
        email:'',
        password:'',
        confirmPassword:''
    });    
    const {signup, currentUser} = useAuth();
      const schema = Joi.object({
        username: Joi.string().required().min(5).max(20),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmedPassword: Joi.ref('password'),
      });

  const { register, handleSubmit, errors } = useForm();

  const handleChange =(e) =>{
      setFormValues({...formValues,[e.target.name]:e.target.value})
  }
  
  const isEmail = (email)=> {
    return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(email);
  }

  const onSubmit = async(data) => {
    console.log("Submit", data);
   await signup(data.email, data.password)
   alert("Successfully sign up .... Wow");
   history.push("/login");
   console.log(currentUser);
  };
  
  return (
    <>
      {/* <!-- main --> */}
      <div className="signup-form-wrapper">
        <h1>Sign up Form</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label-inputs" htmlFor="email">
                E-mail:{" "}
              </label>
              <input
                ref={register({
                  required: true,
                  validate:isEmail
                })}
                className="text email"
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              {/* required error */}
              {errors.email && errors.email.type === "required" && (
                <p className="errorMsg">
                  * This is field required
                </p>
              )}
               {/* Email pattern error */}
               {errors.email && errors.email.type === "validate" && (
                <p className="errorMsg">
                  * Please enter like: example@example.exam
                </p>
              )}
              
              <label className="label-inputs" htmlFor="password">
                Password:{" "}
              </label>
              <input
                ref={register({ required: true })}
                className="text"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <label className="label-inputs" htmlFor="password">
                Confirm Password:{" "}
              </label>
              <input
                ref={register({ required: true })}
                className="text w3lpass"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <div className="wthree-text">
                <label className="anim">
                  <input type="checkbox" className="checkbox" />
                  <span>I Agree To The Terms & Conditions</span>
                </label>
                <div className="clear"> </div>
              </div>
              <input type="submit" value="SIGNUP" />
            </form>
            <p>
              Don't have an Account? <Link to="/login"> Login Now!</Link>
            </p>
          </div>
        </div>
        {/* <!-- copyright --> */}
        <div className="colorlibcopy-agile">
          <p>
            © 2020 NOGO Crop Scouting Notes App. All rights reserved | Design by
            {" Mahmoud Adel "}
            <Link to="https://github.com/mahmoudadel54">Github</Link>
          </p>
        </div>
        {/* <!-- //copyright --> */}
        <ul className="colorlib-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {/* <!-- //main --> */}
    </>
  );
}
