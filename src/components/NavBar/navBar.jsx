import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {useAuth} from '../../contexts/authContext';

export default function NavBar() {
  const navBtnRef = useRef();
  const divRef = useRef();
  const { logout, setIsLogged, currentUser } = useAuth();
  const history = useHistory();
  useEffect(() => {
    let element = navBtnRef.current;
    element.addEventListener("click", () => {
      let divNavBar = divRef.current;
      if (!divNavBar.classList.contains("show")) {
        console.log("add");
        divNavBar.classList.add("show");
      } else {
        console.log("remove");
        divNavBar.classList.remove("show");
      }
    });
  }, [navBtnRef]);
 

  const logoutHandle =async ()=>{
   try {
    await logout();
    localStorage.removeItem("email");
    setIsLogged(false)
    history.push('/');
    } catch (error) {
     alert(error)
   }

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Crop Scouting Notes App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          ref={navBtnRef}
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarTogglerDemo01"
          ref={divRef}
        >
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="#">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Link
              </Link>
            </li>
          </ul>

          <div className="form-inline my-2 my-lg-0">
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
            {/* <Link
              to="/signup"
              style={{ margin: "0 0.5em" }}
              className="btn btn-outline-danger my-2 my-sm-0"
              >
              Register
            </Link> */}
            {!(localStorage.getItem("email")||localStorage.getItem("email")!=="")||!currentUser?
            <Link
              to="/login"
              style={{ margin: "0 0.5em" }}
              className="btn btn-outline-success my-2 my-sm-0"
            >
              Login/register
            </Link>
:
(
<><label>Hello {localStorage.getItem("email")||currentUser.email}</label>
            <button
              style={{ margin: "0 0.5em" }}
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={logoutHandle}
            >
              Logout
            </button></>)
}
          </div>
        </div>
      </nav>
    </div>
  );
}
