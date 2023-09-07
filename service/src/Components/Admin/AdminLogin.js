import React, { useEffect } from "react";

function AdminLogin({ isSearch, setIsSearch }) {
  useEffect(() => {
    setIsSearch(false);
  });
  return (
    <div className="admin-login">
      <div className="login-container col-md-4 p-1">
        <div className="card py-3">
          <form action="POST" className="p-3">
          <h5 style={{fontSize:"50px"}}>SignIn</h5>
          <p>Wlecome back! We are happy to see you again</p>
          <div className="row my-1">
              <label className="col-md-3 p-1">Email</label>
              <input
              className="col-md-9 p-1"
                placeholder="Enter the email"
                name="email"
                type="text"
                required
              />
            </div>
            <div className="row my-1">
              <label className="col-md-3 p-1">Email</label>
              <input
              className="col-md-9 p-1"
                placeholder="Enter the email"
                name="email"
                type="text"
                required
              />
            </div>
            <div className="row my-1">
              <label className="col-md-3 p-1">Password</label>
              <input
              className="col-md-9 p-1"
                placeholder="Enter the password"
                name="email"
                type="text"
                required
              />
            </div>
            <div className="btn-login">
              <button className="btn px-4">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
