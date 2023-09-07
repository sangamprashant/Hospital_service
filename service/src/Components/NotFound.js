import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound({ isSearch, setIsSearch }) {
    useEffect(() => {
      setIsSearch(false);
    });
  return (
    <div className="admin-login not-found">
    <div className="login-container">
    <h1>Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
     
      
    </div>
  );
}

export default NotFound;
