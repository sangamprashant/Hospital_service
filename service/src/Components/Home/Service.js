import React from "react";

function Service() {
  return (
    <div className="service">
      <h1 className="heading">
        Our <span>Services</span>
      </h1>
      <div className="row">
        <div className="col-md-4 ">
          <div
            className="card ssc-square p-3"
            style={{ backgroundColor: "#113172", color: "white", zIndex: "0" }}
          >
            <p className="service-logo">log</p>
            <h5 className="service-title">24/7 Avilable</h5>
          </div>
        </div>
        <div className="col-md-4 ">
          <div
            className="card ssc-square p-3"
            style={{ backgroundColor: " #113172", color: "white", zIndex: "0" }}
          >
            <p className="service-logo">log</p>
            <h5 className="service-title">24/7 Avilable</h5>
          </div>
        </div>
        <div className="col-md-4 ">
          <div
            className="card ssc-square p-3"
            style={{ backgroundColor: " #113172", color: "white", zIndex: "0" }}
          >
            <p className="service-logo">log</p>
            <h5 className="service-title">24/7 Avilable</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
