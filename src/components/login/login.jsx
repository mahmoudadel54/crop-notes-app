import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useAuth} from '../../contexts/authContext';


export default function Login(props) {
  const history = useHistory();
  
    const [formValues, setFormValues] = useState({
        email:'',
        password:'',
    })    
  const {login, setIsLogged} = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const handleChange =(e) =>{
      setFormValues({...formValues,[e.target.name]:e.target.value})
  }
  const onSubmit = async(data) => {
    // console.log("Submit", data);
    try{
      await login(data.email, data.password)
      setIsLogged(true);
      localStorage.setItem("email",data.email);
      history.push("/notelist")
    }catch{
      alert("Wrong credentials Please enter corrcet ones")
    }
  };

  const isEmail = (email)=> {
      return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(email);
  }

  return (
    <>
      {/* <!-- main --> */}
      <div className="signup-form-wrapper">
        <h1>Login Form</h1>
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
            
            
              <input type="submit" value="Login" />
              <div style={{margin:'auto',display:'flex', justifyContent:'center'}}>
                <label>Need an account ?!</label>
              <Link style={{ marginLeft:'0.5em',color:"white", fontSize:'1em'}} to="/signup"> Sign up</Link>
              </div>
            </form>

            
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
