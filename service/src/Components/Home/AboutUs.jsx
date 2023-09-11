import React from "react";
import logo from "../image/hs.jpg";

function AboutUs() {
  return (
    <div className="about">
      <div className="about-container">
        <h1 className="heading">
          About<span>Us</span>
        </h1>
        <div className="row">
          <div className="col-md-6 about-image-container p-3 ">
          <div className="col-md-7">
          <img className="about-image " src={logo} alt="About image" />
          </div>
           
          </div>
          <div className="col-md-6 p-3">
            <h3>Connecting Hospitals with Those in Need</h3>
            <p>
              Our website is on a mission to make access to critical healthcare
              services as seamless as possible. We provide a platform where
              hospitals can register and create detailed digital profiles. What
              sets us apart is our commitment to ensuring the accuracy and
              authenticity of the information available.
            </p>
            <br />
            <p>
              Hospitals that register with us go through an approval process.
              This step is essential to maintain the highest standards of data
              integrity. Once approved, hospitals gain access to their digital
              profiles, allowing them to update and modify their details as
              needed.
            </p>
            <br />
            <p>
              But our mission doesn't stop there. We are driven by a simple yet
              profound goal: to help people find hospitals swiftly during
              emergencies. Imagine a loved one suddenly falling ill, and you
              need to locate the nearest hospital. Our platform simplifies this
              process, enabling you to find the right medical facility in your
              time of need.
            </p>
            <br />
            <p>
              At the core of our service is a commitment to ensuring that
              healthcare resources are accessible when they matter the most. We
              believe that everyone should have easy access to the healthcare
              services they require, and our platform plays a crucial role in
              making this a reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
