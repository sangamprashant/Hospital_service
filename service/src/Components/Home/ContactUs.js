import React, { useEffect } from "react";

function ContactUs({ setIsSearch ,isMount }) {
  useEffect(() => {
    
  },[]);
  return (
    <div className={`${isMount ? "add-padding" : ""}`}>
      <div className={`contact`}>
      <div>
      <h1 className="heading">
        Contact <span>Us</span>
      </h1>
      <div className="form">
        <div className="row my-3">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2 my-2">
                <label className="my-2">Name:</label>
              </div>
              <div className="col-md-10  my-2">
                <input
                  className="contact-input"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2 my-2">
                <label className="my-2">Email:</label>
              </div>
              <div className="col-md-10 my-2">
                <input
                  className="contact-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row px-2">
          <div className="col-md-12 my-2">
            <label className="my-2">Subject</label>
            <input className="contact-input" placeholder="Enter the subject" />
          </div>
          <div className="col-md-12 my-2">
            <label className="my-2">Message</label>
            <textarea
              className="contact-input"
              placeholder="Enter the messsage..."
            ></textarea>
          </div>
        </div>
        <div className="submit-btn ">
          <button className="btn btn-primary px-3">Submit</button>
        </div>
      </div>
      </div>
      
    </div>
    </div>
  );
}

export default ContactUs;
