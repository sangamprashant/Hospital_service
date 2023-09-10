import React from "react";
import AdminPending from "./AdminPending";
import AdminApproved from "./AdminApproved";

const AdminDashboard = () => {
  return (
    <div>
      <div style={{ paddingTop: "100px" }}></div>
      <div className="admin-dashboard">
        <h5 style={{ fontSize: "50px" }}>Admin Dashboard</h5>
        <div className="row">
          <div className="col-md-3 p-3">
            <div className="card">
              <h5 style={{ fontSize: "50px" }}>icon</h5>
              <h5>Number of Hospitals</h5>
            </div>
          </div>
          <div className="col-md-3 p-3">
            <div className="card">
              <h5 style={{ fontSize: "50px" }}>icon</h5>
              <h5>Number of Hospitals Pending</h5>
            </div>
          </div>
          <div className="col-md-3 p-3">
            <div className="card">
              <h5 style={{ fontSize: "50px" }}>icon</h5>
              <h5>Number of Hospitals Approved</h5>
            </div>
          </div>
          <div className="col-md-3 p-3">
            <div className="card">
              <h5 style={{ fontSize: "50px" }}>icon</h5>
              <h5>Number of Applications</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
            <AdminPending/>
        </div>
        <div className="col-md-6">
            <AdminApproved/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
