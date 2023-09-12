import React from "react";
import logo from "./image/hs.jpg"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer containerNotToPrint ssc-square" style={{ color: "black" , height:'max-content', zIndex:"0" }}>
      <div className="footer-container containerNotToPrint">
        <div className="row footer-content">
          <div className="col-md-5 footer-image-container">
          <div className=" col-md-4 ">
          <div>
          <img className="footer-image" src={logo} alt="hospital service" />
          </div>
            
          </div>
            <h1 className='footer-title'>Welcome To <span>Hospital Service</span></h1>
            <p className='footer-description'>An Integrated Platform to Explore Hospital Services</p>
          </div>
          <div className="col-md-3">
            <h3>About Us</h3>
            <p>
              Hospital Service is dedicated to helping you find the healthcare you need when you need it. Our platform connects you with detailed information about hospitals and their services, making healthcare decisions easier.
            </p>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <h3>Useful Links</h3>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
