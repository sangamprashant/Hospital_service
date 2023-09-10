import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import Search from "./Components/Search";
import AdminLogin from "./Components/Admin/AdminLogin";
import NotFound from "./Components/NotFound";
import ContactUs from "./Components/Home/ContactUs";
import Register from "./Components/Register";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminPending from "./Components/Admin/AdminPending";
import AdminApproved from "./Components/Admin/AdminApproved";
import AdminProfile from "./Components/Admin/AdminProfile";
function App() {
  const [isSearch,setIsSearch] = useState(false);
  const isMount =true
  return (
    <BrowserRouter>
    
      <Navbar isSearch={isSearch} setIsSearch={setIsSearch}/>
      <Routes>
      {/* client */}
        <Route path="/" element={<Home isSearch={isSearch} setIsSearch={setIsSearch}  />} />
        <Route path="/contact" element={<ContactUs isMount={isMount} />} />
        <Route path="/register" element={<Register setIsSearch={setIsSearch}/>} />
        <Route path="/search/hospital" element={<Search isSearch={isSearch} setIsSearch={setIsSearch}/>} />
        {/* admin */}
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/application" element={<AdminPending/>} />
        <Route path="/admin/approved" element={<AdminApproved/>} />
        <Route path="/admin/profile" element={<AdminProfile/>} />


        <Route path="/login" element={<AdminLogin isSearch={isSearch} setIsSearch={setIsSearch}/>} />
        <Route path="*" element={<NotFound isSearch={isSearch} setIsSearch={setIsSearch}/>} />
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
