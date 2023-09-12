import React, { useEffect, useState } from "react";
import PrintRegister from "./PrintRegister";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({email: "",name: "",phone: "",address: "",zip: "",password:""});
  const [isPrint,setIsPrint] = useState(false);
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register-hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Hospital registration successful");
        setIsPrint(true);
      } else {
        toast.error("Hospital registration failed");
      }
    } catch (error) {
      console.error("Hospital registration failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="register" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="login-container col-md-5 p-1">
        <div className="card py-3">
        
          <form onSubmit={handleFormSubmit} className="p-3">
          {isPrint?<PrintRegister setFormData={setFormData} formData={formData} setIsPrint={setIsPrint}/>:
          <div>
          <h5 style={{ fontSize: "50px" }}>Register</h5>
            <p>
              We will review your application, and then an email will be sent if verification is approved. This can take up to 24 hours.
            </p>
            <p>Thank you for using our platform :)</p>
            <div className="row my-2">
              <label className="col-md-12 p-1">Name of hospital</label>
              <input
                className="col-md-12 p-1"
                placeholder="Enter the name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="row my-2">
              <label className="col-md-12 p-1">Email of hospital</label>
              <input
                className="col-md-12 p-1"
                placeholder="Enter the email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="row my-2">
              <label className="col-md-12 p-1">Password for hospital</label>
              <input
                className="col-md-12 p-1"
                placeholder="Enter the password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>           
            <div className="row my-2">
              <label className="col-md-12 p-1">Phone number of hospital</label>
              <input
                className="col-md-12 p-1"
                placeholder="Enter the phone number"
                name="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="row my-2">
              <label className="col-md-12 p-1">Address of hospital</label>
              <input
                className="col-md-12 p-1"
                placeholder="Enter the address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="row my-2">
              <label className="col-md-12 p-1">Zip code of hospital</label>
              <input
                className="col-md-12 p-1"
                placeholder="Enter the zip code"
                name="zip"
                type="text"
                required
                value={formData.zip}
                onChange={handleInputChange}
              />
            </div>
            <div className="btn-login">
              <button className="btn px-4" type="submit">Submit</button>
            </div>
          </div>}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
