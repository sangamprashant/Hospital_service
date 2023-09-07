import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar({isSearch,setIsSearch}) {
  const navigate = useNavigate()

const handelSearch =()=>{
  setIsSearch(true);
  navigate("/search/hospital")
}

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Hospital Service
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          {<div className="nav-search">
            {!isSearch?<input className="clickable-input" placeholder="Search here.."  onClick={handelSearch}/>:
          <input className="hidden-input-bar" disabled placeholder="Search Container"/>}
          </div>
            }
            <Link className="nav-item" to="/login">
              <a className="nav-link " aria-current="page">
                Login
              </a>
            </Link>
            <li className="nav-item">
              <a className="nav-link" href="#">
              TODO HospitalLogin
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              TODOApply for hospital
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              TODO LogOut
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
