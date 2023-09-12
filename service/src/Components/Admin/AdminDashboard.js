import React, { useEffect, useState } from "react";
import AdminPending from "./AdminPending";
import AdminApproved from "./AdminApproved";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [notApproved,setNotApproved] = useState(0)
  const [approved, setApproved] = useState(0)
  const [allCount, setAllcount] = useState(0)

  useEffect(()=>{
    handelFetch()
  },[])

  const handelFetch = async ()=>{
      try {
        const response = await fetch("/api/hospitals/count",
        {
          method: "GET",
        }
        );
        if(response.ok){
          const data = await response.json()
          setNotApproved(data.countNotApproved)
          setApproved(data.countApproved)
          setAllcount(data.countHospital)
        }
        else{
          const data = await response.json()
          toast(data.error)
        }
        
      } catch (error) {
        console.log("failed to fetch count:",error)
      }
  }
  return (
    <div>
      <div style={{ paddingTop: "100px" }}></div>
      <div className="admin-dashboard">
        <h5 style={{ fontSize: "50px" }}>Admin Dashboard</h5>
        <div className="row">
          <div className="col-md-4 p-3">
            <div
              className="card ssc-square p-3"
              style={{
                backgroundColor: "#113172",
                color: "white",
                zIndex: "0",
              }}
            >
              <h5 style={{ fontSize: "50px" }}>{allCount}</h5>
              <h5>Total Number of Hospitals</h5>
            </div>
          </div>
          <div className="col-md-4 p-3">
            <div
              className="card ssc-square p-3"
              style={{
                backgroundColor: "#113172",
                color: "white",
                zIndex: "0",
              }}
            >
              <h5 style={{ fontSize: "50px" }}>{approved}</h5>
              <h5>Number of Hospitals Approved</h5>
            </div>
          </div>
          <div className="col-md-4 p-3">
            <div
              className="card ssc-square p-3"
              style={{
                backgroundColor: "#113172",
                color: "white",
                zIndex: "0",
              }}
            >
              <h5 style={{ fontSize: "50px" }}>{notApproved}</h5>
              <h5>Number of Applications</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <AdminPending />
        </div>
        <div className="col-md-6">
          <AdminApproved />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
