import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isSearch, setIsSearch, setLogged, logged }) {
  // Retrieving data
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handelSearch = () => {
    setIsSearch(true);
    navigate("/search/hospital");
  };

  const handelLogout = () => {
    setIsSearch(false);
    setLogged(false);
    localStorage.clear();
  };

  const handelNavbar = () => {
    if (logged || savedToken) {
      if (savedUser?.type === "admin") {
        return (
          <>
            {/* admin */}
            <Link
              className="nav-item"
              to="/admin"
              onClick={() => {
                setIsSearch(false);
              }}
            >
              <a className="nav-link " aria-current="page">
                Admin
              </a>
            </Link>
            <Link
              className="nav-item"
              to="/admin/approved"
              onClick={() => {
                setIsSearch(false);
              }}
            >
              <a className="nav-link " aria-current="page">
                Approved
              </a>
            </Link>
            <Link
              className="nav-item"
              to="/admin/application"
              onClick={() => {
                setIsSearch(false);
              }}
            >
              <a className="nav-link " aria-current="page">
                Appplications
              </a>
            </Link>
            <Link
              className="nav-item"
              to="/"
              onClick={() => {
                handelLogout();
              }}
            >
              <a className="nav-link " aria-current="page">
                Log Out
              </a>
            </Link>
          </>
        );
      } else {
        return (
          <>
            {/* hospital */}
            <Link
              className="nav-item"
              to={`/${savedUser?._id}`}
              onClick={() => {
                setIsSearch(false);
              }}
            >
              <a className="nav-link " aria-current="page">
                Profile
              </a>
            </Link>
            <Link
              className="nav-item"
              to="/"
              onClick={() => {
                handelLogout();
              }}
            >
              <a className="nav-link " aria-current="page">
                Log Out
              </a>
            </Link>
          </>
        );
      }
    } else {
      return (
        <>
          <Link
            className="nav-item"
            to="/register"
            onClick={() => {
              setIsSearch(false);
            }}
          >
            <a className="nav-link " aria-current="page">
              Register
            </a>
          </Link>
          <Link className="nav-item" to="/login" onClick={() => {}}>
            <a className="nav-link " aria-current="page">
              Login
            </a>
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="navbar containerNotToPrint navbar-expand-lg ">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          onClick={() => {
            setIsSearch(false);
          }}
        >
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
            {
              <div className="nav-search">
                {!isSearch ? (
                  <input
                    className="clickable-input"
                    placeholder="Search here.."
                    onClick={handelSearch}
                  />
                ) : (
                  <input
                    className="hidden-input-bar"
                    disabled
                    placeholder="Search Container"
                  />
                )}
              </div>
            }
            <Link
              className="nav-item"
              to="/contact"
              onClick={() => {
                setIsSearch(false);
              }}
            >
              <a className="nav-link " aria-current="page">
                Contact Us
              </a>
            </Link>
            <Link
              className="nav-item"
              to="/about"
              onClick={() => {
                setIsSearch(false);
              }}
            >
              <a className="nav-link " aria-current="page">
               About Us
              </a>
            </Link>
            {handelNavbar()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
