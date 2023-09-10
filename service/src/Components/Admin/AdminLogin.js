import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin({ isSearch, setIsSearch }) {
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsSearch(false);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!account){
      toast.error("Please select a option ");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Make an API request to authenticate the user
      const response = await fetch(`http://localhost:5000/api/${account}/do/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Authentication successful, redirect or perform any necessary actions
        // You can also store the user token or data in state or context for future use
        toast.success("Login successful");
        if(account==="admin"){
          navigate("/admin")
        }else{
          navigate("/hospital")
        }
      } else {
        const data = await response.json();
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-container col-md-4 p-1">
        <div className="card py-3">
          <form onSubmit={handleFormSubmit} className="p-3">
            <h5 style={{ fontSize: "50px" }}>SignIn</h5>
            <p>Welcome back! We are happy to see you again</p>
            <div className="row my-1">
              <label className="col-md-3 p-1">Account</label>
              <select
                className="col-md-9 p-1"
                name="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option value="">Select an account</option>
                <option value="admin">Admin</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>
            <div className="row my-1">
              <label className="col-md-3 p-1">Email</label>
              <input
                className="col-md-9 p-1"
                placeholder="Enter the email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="row my-1">
              <label className="col-md-3 p-1">Password</label>
              <input
                className="col-md-9 p-1"
                placeholder="Enter the password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="btn-login">
              <button className="btn px-4" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Submit"}
              </button>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
