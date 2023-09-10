import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProfile = () => {
      // Retrieving data
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedToken = localStorage.getItem("token");
  const navigate = useNavigate()
  useEffect(()=>{
    if(!savedToken||!savedUser||savedUser.type!=="admin"){
      toast.error("Wrong authenitcation")
      navigate("/")
    }

  },[savedUser])
  return (
    <div className="displaycard">
      <div className="">
        <h5 style={{ fontSize: "50px", textTransform: "capitalize" }}>
          Admin Profile
        </h5>
        <div className="p-4">
          <div className="card">
            <div className="row">
              <div className="col-md-6">fcv</div>
              <div className="col-md-6">fcv</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
