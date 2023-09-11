import React from "react";
import logo from "./image/hs.jpg"

function Footer() {
  return (
    <div className="footer containerNotToPrint ssc-square" style={{ color: "black" , height:'max-content', zIndex:"0" }}>
      <div className="footer-container containerNotToPrint">
        <div className="row">
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
              <div className="col-md-6">
                <h3>Useful Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Search Hospitals</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div className="col-md-6">
                <h3>Contact Us</h3>
                <address>
                  <p>Email: info@hospitalservice.com</p>
                  <p>Phone: +1 (123) 456-7890</p>
                  <p>Address: 123 Hospital Street, City, Country</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
